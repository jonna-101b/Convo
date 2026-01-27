package com.myapp.chatapp.service;

import com.myapp.chatapp.domain.FileMetadata;
import com.myapp.chatapp.domain.Message;
import com.myapp.chatapp.repository.FileMetadataRepository;
import com.myapp.chatapp.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FileService {

    private static final long MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
    private static final int MAX_FILE_NAME_LENGTH = 255;
    private static final List<String> ALLOWED_CONTENT_TYPES = Arrays.asList(
            // Images
            "image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp",
            // Documents
            "application/pdf", "application/msword", 
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain", "text/csv",
            // Audio
            "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4", "audio/webm",
            // Video
            "video/mp4", "video/webm", "video/ogg", "video/quicktime"
    );

    @Autowired
    private FileMetadataRepository fileMetadataRepository;

    @Autowired
    private MessageRepository messageRepository;

    public Long uploadFile(String fileName, String filePath, Long fileSize, String contentType, String fileType) {
        // Validate file
        if (!validateFile(fileName, fileSize, contentType)) {
            return null;
        }

        // Validate file type
        FileMetadata.FileType type;
        try {
            type = FileMetadata.FileType.valueOf(fileType.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }

        // Create file metadata (message will be set later via attachFileToMessage)
        FileMetadata fileMetadata = new FileMetadata();
        fileMetadata.setFilePath(filePath);
        fileMetadata.setFileName(fileName);
        fileMetadata.setFileSize(fileSize);
        fileMetadata.setContentType(contentType);
        fileMetadata.setFileType(type);
        // Note: message will be set when attached to a message

        FileMetadata savedMetadata = fileMetadataRepository.save(fileMetadata);
        return savedMetadata.getId();
    }

    public boolean attachFileToMessage(Long messageId, Long fileMetadataId) {
        // Validate attachment
        if (!validateFileAttachment(messageId, fileMetadataId)) {
            return false;
        }

        Optional<Message> messageOpt = messageRepository.findById(messageId);
        Optional<FileMetadata> fileOpt = fileMetadataRepository.findById(fileMetadataId);
        
        if (messageOpt.isEmpty() || fileOpt.isEmpty()) {
            return false;
        }

        FileMetadata fileMetadata = fileOpt.get();
        fileMetadata.setMessage(messageOpt.get());
        fileMetadataRepository.save(fileMetadata);
        return true;
    }

    public Optional<FileMetadataData> getFileMetadataById(Long fileMetadataId) {
        return fileMetadataRepository.findById(fileMetadataId)
                .map(this::toFileMetadataData);
    }

    public List<FileMetadataData> getFileMetadataByMessageId(Long messageId) {
        return fileMetadataRepository.findByMessage_Id(messageId)
                .stream()
                .map(this::toFileMetadataData)
                .collect(Collectors.toList());
    }

    public boolean deleteFileMetadata(Long fileMetadataId, boolean deletePhysicalFile) {
        Optional<FileMetadata> fileOpt = fileMetadataRepository.findById(fileMetadataId);
        if (fileOpt.isEmpty()) {
            return false;
        }

        FileMetadata fileMetadata = fileOpt.get();
        String filePath = fileMetadata.getFilePath();

        // Delete physical file if requested
        if (deletePhysicalFile && filePath != null) {
            try {
                Path path = Paths.get(filePath);
                if (Files.exists(path)) {
                    Files.delete(path);
                }
            } catch (Exception e) {
                // Log error but continue with metadata deletion
                // In production, you'd want proper logging here
            }
        }

        fileMetadataRepository.delete(fileMetadata);
        return true;
    }

    public Optional<String> getFilePath(Long fileMetadataId) {
        return fileMetadataRepository.findById(fileMetadataId)
                .map(FileMetadata::getFilePath);
    }

    public boolean validateFile(String fileName, Long fileSize, String contentType) {
        return validateFileName(fileName) 
                && validateFileSize(fileSize) 
                && validateContentType(contentType);
    }

    public Optional<FileMetadataData> getFileMetadataByPath(String filePath) {
        // Since we don't have a findByFilePath method, we'll need to search
        // For now, return empty - in production you'd add this query method to repository
        return fileMetadataRepository.findAll()
                .stream()
                .filter(fm -> filePath.equals(fm.getFilePath()))
                .findFirst()
                .map(this::toFileMetadataData);
    }

    public boolean validateFileSize(Long fileSize) {
        if (fileSize == null || fileSize <= 0) {
            return false;
        }
        return fileSize <= MAX_FILE_SIZE;
    }

    public boolean validateContentType(String contentType) {
        if (contentType == null || contentType.trim().isEmpty()) {
            return false;
        }
        return ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase());
    }

    public boolean validateFileName(String fileName) {
        if (fileName == null || fileName.trim().isEmpty()) {
            return false;
        }
        if (fileName.length() > MAX_FILE_NAME_LENGTH) {
            return false;
        }
        // Check for invalid characters
        String invalidChars = "<>:\"/\\|?*";
        for (char c : invalidChars.toCharArray()) {
            if (fileName.indexOf(c) >= 0) {
                return false;
            }
        }
        return true;
    }

    public boolean validateFileAttachment(Long messageId, Long fileMetadataId) {
        // Validate message exists
        Optional<Message> messageOpt = messageRepository.findById(messageId);
        if (messageOpt.isEmpty()) {
            return false;
        }

        // Validate file metadata exists
        Optional<FileMetadata> fileOpt = fileMetadataRepository.findById(fileMetadataId);
        if (fileOpt.isEmpty()) {
            return false;
        }

        // Check if file is already attached to another message
        FileMetadata fileMetadata = fileOpt.get();
        if (fileMetadata.getMessage() != null && !fileMetadata.getMessage().getId().equals(messageId)) {
            return false;
        }

        return true;
    }

    private FileMetadataData toFileMetadataData(FileMetadata fileMetadata) {
        return new FileMetadataData(
                fileMetadata.getId(),
                fileMetadata.getMessage() != null ? fileMetadata.getMessage().getId() : null,
                fileMetadata.getFilePath(),
                fileMetadata.getFileName(),
                fileMetadata.getFileSize(),
                fileMetadata.getContentType(),
                fileMetadata.getFileType() != null ? fileMetadata.getFileType().name() : null,
                fileMetadata.getCreatedAt()
        );
    }

    public record FileMetadataData(
            Long id,
            Long messageId,
            String filePath,
            String fileName,
            Long fileSize,
            String contentType,
            String fileType,
            java.time.Instant createdAt
    ) {}
}
