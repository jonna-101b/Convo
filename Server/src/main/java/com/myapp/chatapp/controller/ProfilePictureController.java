package com.myapp.chatapp.controller;

import com.myapp.chatapp.service.ProfilePictureService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/profile-pictures")
public class ProfilePictureController {

    private final ProfilePictureService profilePictureService;
    private static final String UPLOAD_DIR = "uploads/profile-pictures/";

    public ProfilePictureController(ProfilePictureService profilePictureService) {
        this.profilePictureService = profilePictureService;
    }

    /**
     * Upload user profile picture
     */
    @PostMapping("/users/{userId}")
    public ResponseEntity<Long> uploadUserProfilePicture(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        Long currentUserId = SecurityUtil.getCurrentUserId();

        // User can only upload their own profile picture
        if (!currentUserId.equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR + userId);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate filename
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Create profile picture record
            Long pictureId = profilePictureService.uploadUserProfilePicture(
                    userId,
                    filePath.toString(),
                    file.getOriginalFilename(),
                    file.getSize(),
                    file.getContentType());

            return pictureId != null
                    ? ResponseEntity.status(HttpStatus.CREATED).body(pictureId)
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Upload group profile picture
     */
    @PostMapping("/groups/{groupId}")
    public ResponseEntity<Long> uploadGroupProfilePicture(
            @PathVariable Long groupId,
            @RequestParam("file") MultipartFile file) {
        // Note: In production, verify user has permission to edit this group
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            // Create directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR + "groups/" + groupId);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate filename
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Create profile picture record
            Long pictureId = profilePictureService.uploadGroupProfilePicture(
                    groupId,
                    filePath.toString(),
                    file.getOriginalFilename(),
                    file.getSize(),
                    file.getContentType());

            return pictureId != null
                    ? ResponseEntity.status(HttpStatus.CREATED).body(pictureId)
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Get user profile picture
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<ProfilePictureService.ProfilePictureData> getUserProfilePicture(@PathVariable Long userId) {
        return profilePictureService.getUserProfilePicture(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Get group profile picture
     */
    @GetMapping("/groups/{groupId}")
    public ResponseEntity<ProfilePictureService.ProfilePictureData> getGroupProfilePicture(@PathVariable Long groupId) {
        return profilePictureService.getGroupProfilePicture(groupId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete profile picture
     */
    @DeleteMapping("/{pictureId}")
    public ResponseEntity<Void> deleteProfilePicture(@PathVariable Long pictureId) {
        boolean deleted = profilePictureService.deleteProfilePicture(pictureId);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
