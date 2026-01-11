package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.Group;
import com.myapp.chatapp.domain.ProfilePicture;
import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.repository.GroupRepository;
import com.myapp.chatapp.repository.ProfilePictureRepository;
import com.myapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
// import java.util.stream.Collectors;

@Service
@Transactional
public class ProfilePictureService {

    @Autowired
    private ProfilePictureRepository profilePictureRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;

    /**
     * Upload a profile picture for a user
     */
    public Long uploadUserProfilePicture(Long userId, String filePath, String fileName, Long fileSize,
            String contentType) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return null;
        }

        // Remove old profile picture if exists
        List<ProfilePicture> oldPictures = profilePictureRepository.findByUser_Id(userId);
        profilePictureRepository.deleteAll(oldPictures);

        // Create new profile picture
        ProfilePicture picture = new ProfilePicture();
        picture.setUser(userOpt.get());
        picture.setFilePath(filePath);
        picture.setFileName(fileName);
        picture.setFileSize(fileSize);
        picture.setContentType(contentType);

        ProfilePicture saved = profilePictureRepository.save(picture);
        return saved.getId();
    }

    /**
     * Upload a profile picture for a group
     */
    public Long uploadGroupProfilePicture(Long groupId, String filePath, String fileName, Long fileSize,
            String contentType) {
        Optional<Group> groupOpt = groupRepository.findById(groupId);
        if (groupOpt.isEmpty()) {
            return null;
        }

        // Remove old profile picture if exists
        List<ProfilePicture> oldPictures = profilePictureRepository.findByGroup_Id(groupId);
        profilePictureRepository.deleteAll(oldPictures);

        // Create new profile picture
        ProfilePicture picture = new ProfilePicture();
        picture.setGroup(groupOpt.get());
        picture.setFilePath(filePath);
        picture.setFileName(fileName);
        picture.setFileSize(fileSize);
        picture.setContentType(contentType);

        ProfilePicture saved = profilePictureRepository.save(picture);
        return saved.getId();
    }

    /**
     * Get user profile picture
     */
    public Optional<ProfilePictureData> getUserProfilePicture(Long userId) {
        List<ProfilePicture> pictures = profilePictureRepository.findByUser_Id(userId);
        if (pictures.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(toProfilePictureData(pictures.get(0)));
    }

    /**
     * Get group profile picture
     */
    public Optional<ProfilePictureData> getGroupProfilePicture(Long groupId) {
        List<ProfilePicture> pictures = profilePictureRepository.findByGroup_Id(groupId);
        if (pictures.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(toProfilePictureData(pictures.get(0)));
    }

    /**
     * Delete profile picture
     */
    public boolean deleteProfilePicture(Long pictureId) {
        Optional<ProfilePicture> pictureOpt = profilePictureRepository.findById(pictureId);
        if (pictureOpt.isEmpty()) {
            return false;
        }

        profilePictureRepository.delete(pictureOpt.get());
        return true;
    }

    private ProfilePictureData toProfilePictureData(ProfilePicture picture) {
        return new ProfilePictureData(
                picture.getId(),
                picture.getUser() != null ? picture.getUser().getId() : null,
                picture.getGroup() != null ? picture.getGroup().getId() : null,
                picture.getFilePath(),
                picture.getFileName(),
                picture.getFileSize(),
                picture.getContentType(),
                picture.getCreatedAt(),
                picture.getUpdatedAt());
    }

    /**
     * Profile picture data transfer object
     */
    public record ProfilePictureData(
            Long id,
            Long userId,
            Long groupId,
            String filePath,
            String fileName,
            Long fileSize,
            String contentType,
            java.time.Instant createdAt,
            java.time.Instant updatedAt) {
    }
}
