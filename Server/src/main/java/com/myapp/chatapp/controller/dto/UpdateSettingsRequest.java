package com.myapp.chatapp.controller.dto;

public record UpdateSettingsRequest(
        String theme,
        Boolean notificationsEnabled,
        Boolean soundEnabled,
        String statusVisibility
) {}

