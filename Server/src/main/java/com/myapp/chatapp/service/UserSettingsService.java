package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.domain.UserSettings;
import com.myapp.chatapp.repository.UserRepository;
import com.myapp.chatapp.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserSettingsService {

    private static final List<String> VALID_THEMES = Arrays.asList("light", "dark", "auto");
    private static final List<String> VALID_STATUS_VISIBILITY = Arrays.asList("public", "friends", "private");

    @Autowired
    private UserSettingsRepository userSettingsRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<UserSettingsData> getSettingsByUserId(Long userId) {
        return userSettingsRepository.findByUser_Id(userId)
                .map(this::toUserSettingsData);
    }

    public boolean createDefaultSettings(Long userId) {
        // Validate user exists
        if (!validateUserExists(userId)) {
            return false;
        }

        // Check if settings already exist
        if (userSettingsRepository.findByUser_Id(userId).isPresent()) {
            return false;
        }

        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        UserSettings settings = new UserSettings();
        settings.setUser(user);
        settings.setTheme("light");
        settings.setNotificationsEnabled(true);
        settings.setSoundEnabled(true);
        settings.setStatusVisibility("public");

        userSettingsRepository.save(settings);
        return true;
    }

    public boolean updateTheme(Long userId, String theme) {
        if (!validateTheme(theme)) {
            return false;
        }

        Optional<UserSettings> settingsOpt = userSettingsRepository.findByUser_Id(userId);
        if (settingsOpt.isEmpty()) {
            return false;
        }

        UserSettings settings = settingsOpt.get();
        settings.setTheme(theme);
        userSettingsRepository.save(settings);
        return true;
    }

    public boolean updateNotificationSettings(Long userId, boolean notificationsEnabled) {
        Optional<UserSettings> settingsOpt = userSettingsRepository.findByUser_Id(userId);
        if (settingsOpt.isEmpty()) {
            return false;
        }

        UserSettings settings = settingsOpt.get();
        settings.setNotificationsEnabled(notificationsEnabled);
        userSettingsRepository.save(settings);
        return true;
    }

    public boolean updateSoundSettings(Long userId, boolean soundEnabled) {
        Optional<UserSettings> settingsOpt = userSettingsRepository.findByUser_Id(userId);
        if (settingsOpt.isEmpty()) {
            return false;
        }

        UserSettings settings = settingsOpt.get();
        settings.setSoundEnabled(soundEnabled);
        userSettingsRepository.save(settings);
        return true;
    }

    public boolean updateStatusVisibility(Long userId, String statusVisibility) {
        if (!validateStatusVisibility(statusVisibility)) {
            return false;
        }

        Optional<UserSettings> settingsOpt = userSettingsRepository.findByUser_Id(userId);
        if (settingsOpt.isEmpty()) {
            return false;
        }

        UserSettings settings = settingsOpt.get();
        settings.setStatusVisibility(statusVisibility);
        userSettingsRepository.save(settings);
        return true;
    }

    public boolean updateSettings(Long userId, String theme, Boolean notificationsEnabled, Boolean soundEnabled, String statusVisibility) {
        Optional<UserSettings> settingsOpt = userSettingsRepository.findByUser_Id(userId);
        if (settingsOpt.isEmpty()) {
            return false;
        }

        UserSettings settings = settingsOpt.get();

        if (theme != null) {
            if (!validateTheme(theme)) {
                return false;
            }
            settings.setTheme(theme);
        }

        if (notificationsEnabled != null) {
            settings.setNotificationsEnabled(notificationsEnabled);
        }

        if (soundEnabled != null) {
            settings.setSoundEnabled(soundEnabled);
        }

        if (statusVisibility != null) {
            if (!validateStatusVisibility(statusVisibility)) {
                return false;
            }
            settings.setStatusVisibility(statusVisibility);
        }

        userSettingsRepository.save(settings);
        return true;
    }

    public boolean validateUserExists(Long userId) {
        return userRepository.findById(userId).isPresent();
    }

    public boolean validateTheme(String theme) {
        if (theme == null || theme.trim().isEmpty()) {
            return false;
        }
        return VALID_THEMES.contains(theme.toLowerCase());
    }

    public boolean validateStatusVisibility(String statusVisibility) {
        if (statusVisibility == null || statusVisibility.trim().isEmpty()) {
            return false;
        }
        return VALID_STATUS_VISIBILITY.contains(statusVisibility.toLowerCase());
    }

    private UserSettingsData toUserSettingsData(UserSettings settings) {
        return new UserSettingsData(
                settings.getId(),
                settings.getUser().getId(),
                settings.getTheme(),
                settings.getNotificationsEnabled(),
                settings.getSoundEnabled(),
                settings.getStatusVisibility(),
                settings.getCreatedAt(),
                settings.getUpdatedAt()
        );
    }

    /**
     * User settings data transfer object
     */
    public record UserSettingsData(
            Long id,
            Long userId,
            String theme,
            Boolean notificationsEnabled,
            Boolean soundEnabled,
            String statusVisibility,
            java.time.Instant createdAt,
            java.time.Instant updatedAt
    ) {}
}
