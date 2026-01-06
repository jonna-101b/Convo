package com.myapp.chatapp.controller.dto;

public record AuthResponse(
        String token,
        Long userId,
        String username
) {}

