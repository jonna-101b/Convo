package com.myapp.chatapp.controller;

import com.myapp.chatapp.service.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final FileService fileService;
    private static final String UPLOAD_DIR = "uploads/";

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<Long> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileName = System.currentTimeMillis() + "_" + originalFilename;
            Path filePath = uploadPath.resolve(fileName);

            // Save file
            Files.copy(file.getInputStream(), filePath);

            // Create file metadata
            Long fileMetadataId = fileService.uploadFile(
                    originalFilename,
                    filePath.toString(),
                    file.getSize(),
                    file.getContentType(),
                    getFileType(originalFilename));

            return fileMetadataId != null
                    ? ResponseEntity.status(HttpStatus.CREATED).body(fileMetadataId)
                    : ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/{fileMetadataId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileMetadataId) {
        var fileMetadata = fileService.getFileMetadataById(fileMetadataId);
        if (fileMetadata.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path filePath = Paths.get(fileMetadata.get().filePath());
            byte[] fileContent = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .header("Content-Type", fileMetadata.get().contentType())
                    .header("Content-Disposition", "attachment; filename=\"" + fileMetadata.get().fileName() + "\"")
                    .body(fileContent);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{fileMetadataId}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long fileMetadataId) {
        boolean deleted = fileService.deleteFileMetadata(fileMetadataId, true);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/{fileMetadataId}/metadata")
    public ResponseEntity<FileService.FileMetadataData> getFileMetadata(@PathVariable Long fileMetadataId) {
        return fileService.getFileMetadataById(fileMetadataId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    private String getFileType(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "OTHER";
        }

        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

        if (isImageExtension(extension)) {
            return "IMAGE";
        } else if (isAudioExtension(extension)) {
            return "AUDIO";
        } else if (isVideoExtension(extension)) {
            return "VIDEO";
        } else if (isDocumentExtension(extension)) {
            return "DOCUMENT";
        } else {
            return "OTHER";
        }
    }

    private boolean isImageExtension(String ext) {
        return ext.matches("jpg|jpeg|png|gif|webp|bmp");
    }

    private boolean isAudioExtension(String ext) {
        return ext.matches("mp3|wav|ogg|m4a|aac");
    }

    private boolean isVideoExtension(String ext) {
        return ext.matches("mp4|webm|ogg|mov|avi|mkv");
    }

    private boolean isDocumentExtension(String ext) {
        return ext.matches("pdf|doc|docx|xls|xlsx|txt|csv|ppt|pptx");
    }
}
