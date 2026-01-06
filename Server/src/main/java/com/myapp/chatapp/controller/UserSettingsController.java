package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.UpdateSettingsRequest;
import com.myapp.chatapp.service.UserSettingsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/me/settings")
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @GetMapping
    public ResponseEntity<UserSettingsService.UserSettingsData> getSettings() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userSettingsService.getSettingsByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Void> createDefaultSettings() {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean created = userSettingsService.createDefaultSettings(userId);
        return created ? ResponseEntity.status(HttpStatus.CREATED).build() : ResponseEntity.badRequest().build();
    }

    @PutMapping
    public ResponseEntity<Void> updateSettings(@Valid @RequestBody UpdateSettingsRequest request) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userSettingsService.updateSettings(
                userId,
                request.theme(),
                request.notificationsEnabled(),
                request.soundEnabled(),
                request.statusVisibility()
        );
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/theme")
    public ResponseEntity<Void> updateTheme(@RequestParam String theme) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userSettingsService.updateTheme(userId, theme);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/notifications")
    public ResponseEntity<Void> updateNotifications(@RequestParam boolean enabled) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userSettingsService.updateNotificationSettings(userId, enabled);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/sound")
    public ResponseEntity<Void> updateSound(@RequestParam boolean enabled) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userSettingsService.updateSoundSettings(userId, enabled);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/status-visibility")
    public ResponseEntity<Void> updateStatusVisibility(@RequestParam String statusVisibility) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userSettingsService.updateStatusVisibility(userId, statusVisibility);
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}

