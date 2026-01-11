package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final int MIN_PASSWORD_LENGTH = 8;
    private static final int MAX_PASSWORD_LENGTH = 128;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Long createUser(String username, String email, String password, String firstName, String lastName) {
        // Validate inputs
        if (!validateUsernameFormat(username) || !isUsernameAvailable(username)) {
            return null;
        }
        if (!validateEmailFormat(email) || !isEmailAvailable(email)) {
            return null;
        }
        if (!validatePasswordStrength(password)) {
            return null;
        }

        // Create new user
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Hash password
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setIsActive(true);

        User savedUser = userRepository.save(user);
        return savedUser.getId();
    }

    public Optional<UserData> getUserById(Long userId) {
        return userRepository.findById(userId)
                .map(this::toUserData);
    }

    public Optional<UserData> getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(this::toUserData);
    }

    public Optional<UserData> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::toUserData);
    }

    /**
     * Get the actual User entity (not UserData) for password verification by ID
     */
    public Optional<User> getActualUser(Long userId) {
        return userRepository.findById(userId);
    }

    /**
     * Get the actual User entity (not UserData) for password verification by
     * username/email
     */
    public Optional<User> getActualUser(String usernameOrEmail) {
        Optional<User> userByUsername = userRepository.findByUsername(usernameOrEmail);
        if (userByUsername.isPresent()) {
            return userByUsername;
        }
        return userRepository.findByEmail(usernameOrEmail);
    }

    public boolean updateUserProfile(Long userId, String firstName, String lastName) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        if (firstName != null) {
            user.setFirstName(firstName);
        }
        if (lastName != null) {
            user.setLastName(lastName);
        }

        userRepository.save(user);
        return true;
    }

    public boolean updatePassword(Long userId, String newPassword) {
        if (!validatePasswordStrength(newPassword)) {
            return false;
        }

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword)); // Hash password
        userRepository.save(user);
        return true;
    }

    public boolean setUserActiveStatus(Long userId, boolean isActive) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        user.setIsActive(isActive);
        userRepository.save(user);
        return true;
    }

    public boolean isUsernameAvailable(String username) {
        return !userRepository.findByUsername(username).isPresent();
    }

    public boolean isEmailAvailable(String email) {
        return !userRepository.findByEmail(email).isPresent();
    }

    public List<UserData> getActiveUsers() {
        return userRepository.findByIsActive(true)
                .stream()
                .map(this::toUserData)
                .collect(Collectors.toList());
    }

    public boolean validateUsernameFormat(String username) {
        if (username == null || username.trim().isEmpty()) {
            return false;
        }
        return USERNAME_PATTERN.matcher(username).matches();
    }

    public boolean validateEmailFormat(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public boolean validatePasswordStrength(String password) {
        if (password == null) {
            return false;
        }
        int length = password.length();
        return length >= MIN_PASSWORD_LENGTH && length <= MAX_PASSWORD_LENGTH;
    }

    public boolean validateUserExistsAndActive(Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.isPresent() && Boolean.TRUE.equals(userOpt.get().getIsActive());
    }

    /**
     * Verify password matches the stored hashed password
     */
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    private UserData toUserData(User user) {
        return new UserData(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getIsActive(),
                user.getCreatedAt());
    }

    /**
     * User data transfer object
     */
    public record UserData(
            Long id,
            String username,
            String email,
            String firstName,
            String lastName,
            Boolean isActive,
            java.time.Instant createdAt) {
    }
}
