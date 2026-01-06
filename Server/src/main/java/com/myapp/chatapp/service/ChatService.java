package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.Chat;
import com.myapp.chatapp.domain.ChatParticipant;
import com.myapp.chatapp.domain.Group;
import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.repository.ChatParticipantRepository;
import com.myapp.chatapp.repository.ChatRepository;
import com.myapp.chatapp.repository.GroupRepository;
import com.myapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ChatParticipantRepository chatParticipantRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    public Long createDirectChat(Long userId1, Long userId2) {
        // Validate users exist
        Optional<User> user1Opt = userRepository.findById(userId1);
        Optional<User> user2Opt = userRepository.findById(userId2);
        if (user1Opt.isEmpty() || user2Opt.isEmpty()) {
            return null;
        }

        // Check if direct chat already exists
        if (!canCreateDirectChat(userId1, userId2)) {
            return null;
        }

        // Create chat
        Chat chat = new Chat();
        chat.setChatType(Chat.ChatType.DIRECT);

        Chat savedChat = chatRepository.save(chat);

        // Create participants
        User user1 = user1Opt.get();
        User user2 = user2Opt.get();

        ChatParticipant participant1 = new ChatParticipant();
        participant1.setChat(savedChat);
        participant1.setUser(user1);
        participant1.setRole(ChatParticipant.ParticipantRole.MEMBER);
        participant1.setIsActive(true);

        ChatParticipant participant2 = new ChatParticipant();
        participant2.setChat(savedChat);
        participant2.setUser(user2);
        participant2.setRole(ChatParticipant.ParticipantRole.MEMBER);
        participant2.setIsActive(true);

        chatParticipantRepository.save(participant1);
        chatParticipantRepository.save(participant2);

        return savedChat.getId();
    }

    public Long createGroupChat(Long creatorId, String groupName, String description, List<Long> initialMemberIds) {
        // Validate creator exists
        Optional<User> creatorOpt = userRepository.findById(creatorId);
        if (creatorOpt.isEmpty()) {
            return null;
        }

        // Validate initial members exist
        if (initialMemberIds == null || initialMemberIds.isEmpty() || !initialMemberIds.contains(creatorId)) {
            return null;
        }

        List<User> members = new ArrayList<>();
        for (Long memberId : initialMemberIds) {
            Optional<User> userOpt = userRepository.findById(memberId);
            if (userOpt.isEmpty()) {
                return null;
            }
            members.add(userOpt.get());
        }

        // Create chat
        Chat chat = new Chat();
        chat.setChatType(Chat.ChatType.GROUP);
        Chat savedChat = chatRepository.save(chat);

        // Create group
        Group group = new Group();
        group.setChat(savedChat);
        group.setName(groupName);
        group.setDescription(description);
        group.setCreatedBy(creatorOpt.get());
        groupRepository.save(group);

        // Create participants
        for (User member : members) {
            ChatParticipant participant = new ChatParticipant();
            participant.setChat(savedChat);
            participant.setUser(member);
            participant.setIsActive(true);

            // Creator is owner, others are members
            if (member.getId().equals(creatorId)) {
                participant.setRole(ChatParticipant.ParticipantRole.OWNER);
            } else {
                participant.setRole(ChatParticipant.ParticipantRole.MEMBER);
            }

            chatParticipantRepository.save(participant);
        }

        return savedChat.getId();
    }

    public Optional<ChatData> getChatById(Long chatId) {
        return chatRepository.findById(chatId)
                .map(this::toChatData);
    }

    public List<ChatData> getChatsForUser(Long userId) {
        List<ChatParticipant> participants = chatParticipantRepository.findByUser_Id(userId);
        return participants.stream()
                .map(ChatParticipant::getChat)
                .map(this::toChatData)
                .collect(Collectors.toList());
    }

    public Optional<ChatData> getDirectChat(Long userId1, Long userId2) {
        // Find all chats for user1
        List<ChatParticipant> user1Participants = chatParticipantRepository.findByUser_Id(userId1);
        
        for (ChatParticipant participant1 : user1Participants) {
            Chat chat = participant1.getChat();
            if (chat.getChatType() == Chat.ChatType.DIRECT) {
                // Check if user2 is also a participant
                List<ChatParticipant> chatParticipants = chatParticipantRepository.findByChat_Id(chat.getId());
                boolean user2Found = chatParticipants.stream()
                        .anyMatch(p -> p.getUser().getId().equals(userId2) && Boolean.TRUE.equals(p.getIsActive()));
                
                if (user2Found) {
                    return Optional.of(toChatData(chat));
                }
            }
        }
        
        return Optional.empty();
    }

    public boolean addParticipantToGroup(Long chatId, Long userId, Long addedByUserId) {
        // Validate group chat
        if (!validateGroupChat(chatId)) {
            return false;
        }

        // Validate addedByUserId has admin permission
        if (!validateAdminPermission(chatId, addedByUserId)) {
            return false;
        }

        // Validate user can be added
        if (!canAddUserToGroup(chatId, userId)) {
            return false;
        }

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        if (chatOpt.isEmpty()) {
            return false;
        }

        // Create participant
        ChatParticipant participant = new ChatParticipant();
        participant.setChat(chatOpt.get());
        participant.setUser(userOpt.get());
        participant.setRole(ChatParticipant.ParticipantRole.MEMBER);
        participant.setIsActive(true);

        chatParticipantRepository.save(participant);
        return true;
    }

    public boolean removeParticipantFromGroup(Long chatId, Long userId, Long removedByUserId) {
        // Validate group chat
        if (!validateGroupChat(chatId)) {
            return false;
        }

        // Validate removedByUserId has admin permission
        if (!validateAdminPermission(chatId, removedByUserId)) {
            return false;
        }

        // Find participant
        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (participantOpt.isEmpty()) {
            return false;
        }

        ChatParticipant participant = participantOpt.get();
        participant.setIsActive(false);
        participant.setLeftAt(java.time.Instant.now());

        chatParticipantRepository.save(participant);
        return true;
    }

    public boolean updateGroupInfo(Long chatId, String groupName, String description, Long updatedByUserId) {
        // Validate group chat
        if (!validateGroupChat(chatId)) {
            return false;
        }

        // Validate updatedByUserId has admin permission
        if (!validateAdminPermission(chatId, updatedByUserId)) {
            return false;
        }

        Optional<Group> groupOpt = groupRepository.findByChat_Id(chatId);
        if (groupOpt.isEmpty()) {
            return false;
        }

        Group group = groupOpt.get();
        if (groupName != null) {
            group.setName(groupName);
        }
        if (description != null) {
            group.setDescription(description);
        }

        groupRepository.save(group);
        return true;
    }

    public boolean changeParticipantRole(Long chatId, Long userId, String newRole, Long changedByUserId) {
        // Validate group chat
        if (!validateGroupChat(chatId)) {
            return false;
        }

        // Validate changedByUserId has admin permission
        if (!validateAdminPermission(chatId, changedByUserId)) {
            return false;
        }

        // Validate role
        ChatParticipant.ParticipantRole role;
        try {
            role = ChatParticipant.ParticipantRole.valueOf(newRole.toUpperCase());
        } catch (IllegalArgumentException e) {
            return false;
        }

        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (participantOpt.isEmpty()) {
            return false;
        }

        ChatParticipant participant = participantOpt.get();
        participant.setRole(role);

        chatParticipantRepository.save(participant);
        return true;
    }

    public boolean leaveGroupChat(Long chatId, Long userId) {
        // Validate group chat
        if (!validateGroupChat(chatId)) {
            return false;
        }

        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (participantOpt.isEmpty() || !Boolean.TRUE.equals(participantOpt.get().getIsActive())) {
            return false;
        }

        ChatParticipant participant = participantOpt.get();
        participant.setIsActive(false);
        participant.setLeftAt(java.time.Instant.now());

        chatParticipantRepository.save(participant);
        return true;
    }

    public List<ParticipantData> getChatParticipants(Long chatId) {
        return chatParticipantRepository.findByChat_Id(chatId)
                .stream()
                .map(this::toParticipantData)
                .collect(Collectors.toList());
    }

    public List<ParticipantData> getActiveChatParticipants(Long chatId) {
        return chatParticipantRepository.findByChat_IdAndIsActiveTrue(chatId)
                .stream()
                .map(this::toParticipantData)
                .collect(Collectors.toList());
    }

    public boolean isUserParticipant(Long chatId, Long userId) {
        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        return participantOpt.isPresent() && Boolean.TRUE.equals(participantOpt.get().getIsActive());
    }

    public boolean validateUserParticipation(Long chatId, Long userId) {
        return isUserParticipant(chatId, userId);
    }

    public boolean validateAdminPermission(Long chatId, Long userId) {
        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (participantOpt.isEmpty() || !Boolean.TRUE.equals(participantOpt.get().getIsActive())) {
            return false;
        }

        ChatParticipant.ParticipantRole role = participantOpt.get().getRole();
        return role == ChatParticipant.ParticipantRole.ADMIN || role == ChatParticipant.ParticipantRole.OWNER;
    }

    public boolean validateOwnerPermission(Long chatId, Long userId) {
        Optional<ChatParticipant> participantOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (participantOpt.isEmpty() || !Boolean.TRUE.equals(participantOpt.get().getIsActive())) {
            return false;
        }

        return participantOpt.get().getRole() == ChatParticipant.ParticipantRole.OWNER;
    }

    public boolean validateGroupChat(Long chatId) {
        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        return chatOpt.isPresent() && chatOpt.get().getChatType() == Chat.ChatType.GROUP;
    }

    public boolean canAddUserToGroup(Long chatId, Long userId) {
        // Check if user is already an active participant
        Optional<ChatParticipant> existingOpt = chatParticipantRepository.findByUser_IdAndChat_Id(userId, chatId);
        if (existingOpt.isPresent() && Boolean.TRUE.equals(existingOpt.get().getIsActive())) {
            return false;
        }

        // Validate user exists and is active
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && Boolean.TRUE.equals(userOpt.get().getIsActive());
    }

    public boolean canCreateDirectChat(Long userId1, Long userId2) {
        // Check if direct chat already exists
        return getDirectChat(userId1, userId2).isEmpty();
    }

    private ChatData toChatData(Chat chat) {
        String groupName = null;
        String groupDescription = null;
        Long groupId = null;

        if (chat.getChatType() == Chat.ChatType.GROUP) {
            Optional<Group> groupOpt = groupRepository.findByChat_Id(chat.getId());
            if (groupOpt.isPresent()) {
                Group group = groupOpt.get();
                groupId = group.getId();
                groupName = group.getName();
                groupDescription = group.getDescription();
            }
        }

        return new ChatData(
                chat.getId(),
                chat.getChatType().name(),
                groupId,
                groupName,
                groupDescription,
                chat.getCreatedAt(),
                chat.getUpdatedAt()
        );
    }

    private ParticipantData toParticipantData(ChatParticipant participant) {
        return new ParticipantData(
                participant.getId(),
                participant.getUser().getId(),
                participant.getUser().getUsername(),
                participant.getRole().name(),
                participant.getIsActive(),
                participant.getJoinedAt()
        );
    }

    /**
     * Chat data transfer object
     */
    public record ChatData(
            Long id,
            String chatType,
            Long groupId,
            String groupName,
            String groupDescription,
            java.time.Instant createdAt,
            java.time.Instant updatedAt) {
    }

    /**
     * Participant data transfer object
     */
    public record ParticipantData(
            Long id,
            Long userId,
            String username,
            String role,
            Boolean isActive,
            java.time.Instant joinedAt) {
    }
}
