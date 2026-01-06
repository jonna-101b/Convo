package com.myapp.chatapp.controller.dto;

import jakarta.validation.constraints.Size;

public record UpdateGroupRequest(
        @Size(max = 100, message = "Group name must not exceed 100 characters")
        String groupName,

        @Size(max = 500, message = "Description must not exceed 500 characters")
        String description
) {}

