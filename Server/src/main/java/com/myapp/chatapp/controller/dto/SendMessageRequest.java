package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SendMessageRequest(
        @NotNull(message = "Chat ID is required")
        Long chatId,

        @Size(max = 5000, message = "Message content must not exceed 5000 characters")
        String content
) {}

