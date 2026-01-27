package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.Chat;
import com.myapp.chatapp.domain.FileMetadata;
import com.myapp.chatapp.domain.Message;
import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.repository.ChatRepository;
import com.myapp.chatapp.repository.FileMetadataRepository;
import com.myapp.chatapp.repository.MessageRepository;
import com.myapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MessageService {

    private static final int MAX_MESSAGE_CONTENT_LENGTH = 10000;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    @Autowired
    private ChatService chatService;

    public Long sendTextMessage(Long chatId, Long senderId, String content) {
        // Validate sender participation
        if (!validateSenderParticipation(chatId, senderId)) {
            return null;
        }

        // Validate message content
        if (!validateMessageContent(content)) {
            return null;
        }

        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        Optional<User> senderOpt = userRepository.findById(senderId);
        if (chatOpt.isEmpty() || senderOpt.isEmpty()) {
            return null;
        }

        Message message = new Message();
        message.setChat(chatOpt.get());
        message.setSender(senderOpt.get());
        message.setContent(content);
        message.setMessageType(Message.MessageType.TEXT);
        message.setIsEdited(false);
        message.setIsDeleted(false);

        Message savedMessage = messageRepository.save(message);
        return savedMessage.getId();
    }

    public Long sendFileMessage(Long chatId, Long senderId, String content, String messageType, Long fileMetadataId) {
        // Validate sender participation
        if (!validateSenderParticipation(chatId, senderId)) {
            return null;
        }

        // Validate content if provided
        if (content != null && !content.trim().isEmpty() && !validateMessageContent(content)) {
            return null;
        }

        // Validate message type
        Message.MessageType type;
        try {
            type = Message.MessageType.valueOf(messageType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }

        // Validate file metadata exists
        Optional<FileMetadata> fileOpt = fileMetadataRepository.findById(fileMetadataId);
        if (fileOpt.isEmpty()) {
            return null;
        }

        Optional<Chat> chatOpt = chatRepository.findById(chatId);
        Optional<User> senderOpt = userRepository.findById(senderId);
        if (chatOpt.isEmpty() || senderOpt.isEmpty()) {
            return null;
        }

        Message message = new Message();
        message.setChat(chatOpt.get());
        message.setSender(senderOpt.get());
        message.setContent(content);
        message.setMessageType(type);
        message.setIsEdited(false);
        message.setIsDeleted(false);

        Message savedMessage = messageRepository.save(message);

        // Attach file metadata to message
        FileMetadata fileMetadata = fileOpt.get();
        fileMetadata.setMessage(savedMessage);
        fileMetadataRepository.save(fileMetadata);

        return savedMessage.getId();
    }

    public Optional<MessageData> getMessageById(Long messageId, Long userId) {
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return Optional.empty();
        }

        Message message = messageOpt.get();
        Long chatId = message.getChat().getId();

        // Validate user has access to the chat
        if (!validateMessageAccess(chatId, userId)) {
            return Optional.empty();
        }

        return Optional.of(toMessageData(message));
    }

    public List<MessageData> getMessagesForChat(Long chatId, Long userId, int page, int size) {
        // Validate user has access to chat
        if (!validateMessageAccess(chatId, userId)) {
            return List.of();
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Message> messagePage = messageRepository.findByChat_IdOrderByCreatedAtDesc(chatId, pageable);
        
        return messagePage.getContent()
                .stream()
                .map(this::toMessageData)
                .collect(Collectors.toList());
    }

    public List<MessageData> getActiveMessagesForChat(Long chatId, Long userId, int page, int size) {
        // Validate user has access to chat
        if (!validateMessageAccess(chatId, userId)) {
            return List.of();
        }

        Pageable pageable = PageRequest.of(page, size);
        Page<Message> messagePage = messageRepository.findByChat_IdAndIsDeletedFalseOrderByCreatedAtDesc(chatId, pageable);
        
        return messagePage.getContent()
                .stream()
                .map(this::toMessageData)
                .collect(Collectors.toList());
    }

    public List<MessageData> getRecentMessages(Long chatId, Long userId, int limit) {
        // Validate user has access to chat
        if (!validateMessageAccess(chatId, userId)) {
            return List.of();
        }

        List<Message> messages = messageRepository.findByChat_IdOrderByCreatedAtDesc(chatId);
        
        return messages.stream()
                .limit(limit)
                .map(this::toMessageData)
                .collect(Collectors.toList());
    }

    public boolean editMessage(Long messageId, Long senderId, String newContent) {
        if (!validateMessageContent(newContent)) {
            return false;
        }

        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return false;
        }

        Message message = messageOpt.get();

        // Validate sender owns the message
        if (!message.getSender().getId().equals(senderId)) {
            return false;
        }

        // Validate message is not deleted
        if (Boolean.TRUE.equals(message.getIsDeleted())) {
            return false;
        }

        message.setContent(newContent);
        message.setIsEdited(true);
        messageRepository.save(message);
        return true;
    }

    public boolean deleteMessage(Long messageId, Long userId) {
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return false;
        }

        Message message = messageOpt.get();

        // Check if user can delete the message
        if (!canUserDeleteMessage(messageId, userId)) {
            return false;
        }

        message.setIsDeleted(true);
        messageRepository.save(message);
        return true;
    }

    public List<MessageData> getMessagesBySender(Long senderId, int page, int size) {
        List<Message> allMessages = messageRepository.findBySender_Id(senderId);
        
        return allMessages.stream()
                .skip(page * size)
                .limit(size)
                .map(this::toMessageData)
                .collect(Collectors.toList());
    }

    public boolean canUserEditMessage(Long messageId, Long userId) {
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return false;
        }

        Message message = messageOpt.get();

        // User can edit if they are the sender and message is not deleted
        return message.getSender().getId().equals(userId) && !Boolean.TRUE.equals(message.getIsDeleted());
    }

    public boolean canUserDeleteMessage(Long messageId, Long userId) {
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return false;
        }

        Message message = messageOpt.get();
        Long chatId = message.getChat().getId();

        // User can delete if they are the sender
        if (message.getSender().getId().equals(userId)) {
            return true;
        }

        // Or if they are admin/owner of the chat
        return chatService.validateAdminPermission(chatId, userId);
    }

    public boolean validateSenderParticipation(Long chatId, Long senderId) {
        return chatService.validateUserParticipation(chatId, senderId);
    }

    public boolean validateMessageAccess(Long chatId, Long userId) {
        return chatService.validateUserParticipation(chatId, userId);
    }

    public boolean validateMessageContent(String content) {
        if (content == null || content.trim().isEmpty()) {
            return false;
        }
        return content.length() <= MAX_MESSAGE_CONTENT_LENGTH;
    }

    private MessageData toMessageData(Message message) {
        List<FileMetadataData> fileMetadataList = fileMetadataRepository.findByMessage_Id(message.getId())
                .stream()
                .map(fm -> new FileMetadataData(
                        fm.getId(),
                        fm.getFileName(),
                        fm.getFileSize(),
                        fm.getContentType(),
                        fm.getFileType() != null ? fm.getFileType().name() : null
                ))
                .collect(Collectors.toList());

        return new MessageData(
                message.getId(),
                message.getChat().getId(),
                message.getSender().getId(),
                message.getSender().getUsername(),
                message.getContent(),
                message.getMessageType().name(),
                message.getIsEdited(),
                message.getIsDeleted(),
                fileMetadataList,
                message.getCreatedAt(),
                message.getUpdatedAt()
        );
    }

    public record MessageData(
            Long id,
            Long chatId,
            Long senderId,
            String senderUsername,
            String content,
            String messageType,
            Boolean isEdited,
            Boolean isDeleted,
            List<FileMetadataData> fileMetadata,
            java.time.Instant createdAt,
            java.time.Instant updatedAt
    ) {}

    public record FileMetadataData(
            Long id,
            String fileName,
            Long fileSize,
            String contentType,
            String fileType
    ) {}
}
