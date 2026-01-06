package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotNull;

public record SendFriendRequestRequest(
        @NotNull(message = "Receiver ID is required")
        Long receiverId
) {}

