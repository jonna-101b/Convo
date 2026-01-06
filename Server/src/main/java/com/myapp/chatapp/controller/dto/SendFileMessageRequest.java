package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SendFileMessageRequest(
        @NotNull(message = "Chat ID is required")
        Long chatId,

        @Size(max = 5000, message = "Message content must not exceed 5000 characters")
        String content,

        @NotNull(message = "Message type is required")
        String messageType,

        @NotNull(message = "File metadata ID is required")
        Long fileMetadataId
) {}

