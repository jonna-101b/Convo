package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateGroupChatRequest(
        @NotBlank(message = "Group name is required")
        @Size(max = 100, message = "Group name must not exceed 100 characters")
        String groupName,

        @Size(max = 500, message = "Description must not exceed 500 characters")
        String description,

        @NotNull(message = "Initial members are required")
        List<Long> initialMemberIds
) {}

