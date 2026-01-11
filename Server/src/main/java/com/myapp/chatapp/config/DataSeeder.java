package com.myapp.chatapp.config;

import com.myapp.chatapp.domain.*;
import com.myapp.chatapp.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserSettingsRepository userSettingsRepository;
    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final GroupRepository groupRepository;
    private final MessageRepository messageRepository;
    private final FileMetadataRepository fileMetadataRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final ProfilePictureRepository profilePictureRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.enabled:false}")
    private boolean seedEnabled;

    public DataSeeder(
            UserRepository userRepository,
            UserSettingsRepository userSettingsRepository,
            ChatRepository chatRepository,
            ChatParticipantRepository chatParticipantRepository,
            GroupRepository groupRepository,
            MessageRepository messageRepository,
            FileMetadataRepository fileMetadataRepository,
            FriendRequestRepository friendRequestRepository,
            ProfilePictureRepository profilePictureRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userSettingsRepository = userSettingsRepository;
        this.chatRepository = chatRepository;
        this.chatParticipantRepository = chatParticipantRepository;
        this.groupRepository = groupRepository;
        this.messageRepository = messageRepository;
        this.fileMetadataRepository = fileMetadataRepository;
        this.friendRequestRepository = friendRequestRepository;
        this.profilePictureRepository = profilePictureRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (!seedEnabled) {
            return;
        }

        // Seed users
        User alice = upsertUser("alice", "alice@example.com", "SecurePass123", "Alice", "Anderson");
        User bob = upsertUser("bob", "bob@example.com", "SecurePass123", "Bob", "Brown");
        User charlie = upsertUser("charlie", "charlie@example.com", "SecurePass123", "Charlie", "Clark");

        // User settings
        upsertUserSettings(alice, "light", true, true, "friends");
        upsertUserSettings(bob, "dark", true, false, "public");

        // Direct chat between Alice and Bob
        Chat directChat = ensureChat(Chat.ChatType.DIRECT);
        ensureParticipant(alice, directChat, ChatParticipant.ParticipantRole.OWNER);
        ensureParticipant(bob, directChat, ChatParticipant.ParticipantRole.MEMBER);

        // Messages in direct chat
        ensureMessage(directChat, alice, Message.MessageType.TEXT, "Hey Bob!", false);
        ensureMessage(directChat, bob, Message.MessageType.TEXT, "Hi Alice, what's up?", false);

        // Group chat created by Alice with Bob & Charlie
        Chat groupChat = ensureChat(Chat.ChatType.GROUP);
        ensureParticipant(alice, groupChat, ChatParticipant.ParticipantRole.OWNER);
        ensureParticipant(bob, groupChat, ChatParticipant.ParticipantRole.ADMIN);
        ensureParticipant(charlie, groupChat, ChatParticipant.ParticipantRole.MEMBER);

        Group devGroup = ensureGroup(groupChat, "Development Team", "Team chat for developers", alice);

        // Group messages
        ensureMessage(groupChat, alice, Message.MessageType.TEXT, "Welcome to the dev chat!", false);
        Message specMsg = ensureMessage(groupChat, bob, Message.MessageType.FILE, "Please review the spec.", false);
        ensureFileMetadata(specMsg, "/uploads/specs/spec-v1.pdf", "spec-v1.pdf", 102400L, "application/pdf",
                FileMetadata.FileType.DOCUMENT);

        // Friend requests
        ensureFriendRequest(alice, charlie, FriendRequest.FriendRequestStatus.PENDING);

        // Profile pictures
        ensureProfilePictureUser(alice, "/uploads/profiles/alice.jpg", "alice.jpg", 40960L, "image/jpeg");
        ensureProfilePictureGroup(devGroup, "/uploads/groups/devgroup.png", "devgroup.png", 51200L, "image/png");
    }

    private User upsertUser(String username, String email, String rawPassword, String firstName, String lastName) {
        return userRepository.findByUsername(username).orElseGet(() -> {
            User u = new User();
            u.setUsername(username);
            u.setEmail(email);
            u.setPassword(passwordEncoder.encode(rawPassword));
            u.setFirstName(firstName);
            u.setLastName(lastName);
            u.setIsActive(true);
            u.setCreatedAt(Instant.now());
            u.setUpdatedAt(Instant.now());
            return userRepository.save(u);
        });
    }

    private void upsertUserSettings(User user, String theme, boolean notificationsEnabled, boolean soundEnabled,
            String statusVisibility) {
        userSettingsRepository.findByUser_Id(user.getId()).orElseGet(() -> {
            UserSettings s = new UserSettings();
            s.setUser(user);
            s.setTheme(theme);
            s.setNotificationsEnabled(notificationsEnabled);
            s.setSoundEnabled(soundEnabled);
            s.setStatusVisibility(statusVisibility);
            s.setCreatedAt(Instant.now());
            s.setUpdatedAt(Instant.now());
            return userSettingsRepository.save(s);
        });
    }

    private Chat ensureChat(Chat.ChatType type) {
        Chat c = new Chat();
        c.setChatType(type);
        c.setCreatedAt(Instant.now());
        c.setUpdatedAt(Instant.now());
        return chatRepository.save(c);
    }

    private void ensureParticipant(User user, Chat chat, ChatParticipant.ParticipantRole role) {
        ChatParticipant cp = new ChatParticipant();
        cp.setUser(user);
        cp.setChat(chat);
        cp.setRole(role);
        cp.setJoinedAt(Instant.now());
        cp.setIsActive(true);
        chatParticipantRepository.save(cp);
    }

    private Group ensureGroup(Chat chat, String name, String description, User createdBy) {
        return groupRepository.findByChat_Id(chat.getId()).orElseGet(() -> {
            Group g = new Group();
            g.setChat(chat);
            g.setName(name);
            g.setDescription(description);
            g.setCreatedBy(createdBy);
            g.setCreatedAt(Instant.now());
            g.setUpdatedAt(Instant.now());
            return groupRepository.save(g);
        });
    }

    private Message ensureMessage(Chat chat, User sender, Message.MessageType type, String content, boolean edited) {
        Message m = new Message();
        m.setChat(chat);
        m.setSender(sender);
        m.setMessageType(type);
        m.setContent(content);
        m.setIsEdited(edited);
        m.setIsDeleted(false);
        m.setCreatedAt(Instant.now());
        m.setUpdatedAt(Instant.now());
        return messageRepository.save(m);
    }

    private void ensureFileMetadata(Message message, String path, String name, Long size, String contentType,
            FileMetadata.FileType type) {
        FileMetadata f = new FileMetadata();
        f.setMessage(message);
        f.setFilePath(path);
        f.setFileName(name);
        f.setFileSize(size);
        f.setContentType(contentType);
        f.setFileType(type);
        f.setCreatedAt(Instant.now());
        fileMetadataRepository.save(f);
    }

    private void ensureFriendRequest(User sender, User receiver, FriendRequest.FriendRequestStatus status) {
        FriendRequest fr = new FriendRequest();
        fr.setSender(sender);
        fr.setReceiver(receiver);
        fr.setStatus(status);
        fr.setCreatedAt(Instant.now());
        fr.setUpdatedAt(Instant.now());
        friendRequestRepository.save(fr);
    }

    private void ensureProfilePictureUser(User user, String path, String name, Long size, String contentType) {
        ProfilePicture p = new ProfilePicture();
        p.setUser(user);
        p.setFilePath(path);
        p.setFileName(name);
        p.setFileSize(size);
        p.setContentType(contentType);
        p.setCreatedAt(Instant.now());
        p.setUpdatedAt(Instant.now());
        profilePictureRepository.save(p);
    }

    private void ensureProfilePictureGroup(Group group, String path, String name, Long size, String contentType) {
        ProfilePicture p = new ProfilePicture();
        p.setGroup(group);
        p.setFilePath(path);
        p.setFileName(name);
        p.setFileSize(size);
        p.setContentType(contentType);
        p.setCreatedAt(Instant.now());
        p.setUpdatedAt(Instant.now());
        profilePictureRepository.save(p);
    }
}
