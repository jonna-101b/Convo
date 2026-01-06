package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.ChangePasswordRequest;
import com.myapp.chatapp.controller.dto.UpdateProfileRequest;
import com.myapp.chatapp.service.UserService;
import jakarta.validation.Valid;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserService.UserData> getCurrentUser() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserService.UserData> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserService.UserData> getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/me/profile")
    public ResponseEntity<Void> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        Long userId = SecurityUtil.getCurrentUserId();
        boolean updated = userService.updateUserProfile(
                userId,
                request.firstName(),
                request.lastName());
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/me/password")
    public ResponseEntity<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        Long userId = SecurityUtil.getCurrentUserId();
        // In real implementation, verify currentPassword before updating
        boolean updated = userService.updatePassword(userId, request.newPassword());
        return updated ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/active")
    public ResponseEntity<List<UserService.UserData>> getActiveUsers() {
        return ResponseEntity.ok(userService.getActiveUsers());
    }

    @GetMapping("/check/username/{username}")
    public ResponseEntity<Boolean> checkUsernameAvailability(@PathVariable String username) {
        return ResponseEntity.ok(userService.isUsernameAvailable(username));
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> checkEmailAvailability(@PathVariable String email) {
        return ResponseEntity.ok(userService.isEmailAvailable(email));
    }
}
