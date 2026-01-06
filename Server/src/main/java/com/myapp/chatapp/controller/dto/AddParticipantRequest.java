package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotNull;

public record AddParticipantRequest(
        @NotNull(message = "User ID is required")
        Long userId
) {}

