package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChangeRoleRequest(
        @NotNull(message = "User ID is required")
        Long userId,

        @NotBlank(message = "Role is required")
        String role
) {}

