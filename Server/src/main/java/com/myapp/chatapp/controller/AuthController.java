package com.myapp.chatapp.controller;

import com.myapp.chatapp.controller.dto.AuthResponse;
import com.myapp.chatapp.controller.dto.LoginRequest;
import com.myapp.chatapp.controller.dto.RegisterRequest;
import com.myapp.chatapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        Long userId = userService.createUser(
                request.username(),
                request.email(),
                request.password(), // Should be hashed in service layer
                request.firstName(),
                request.lastName()
        );

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // In real implementation, generate JWT token here
        String token = "jwt-token-placeholder"; // Replace with actual JWT generation

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, userId, request.username()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // In real implementation, authenticate user and generate JWT
        // This is a placeholder - implement actual authentication logic
        var user = userService.getUserByUsername(request.usernameOrEmail())
                .or(() -> userService.getUserByEmail(request.usernameOrEmail()));

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // In real implementation, verify password and generate JWT token
        String token = "jwt-token-placeholder"; // Replace with actual JWT generation

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.get().id(),
                user.get().username()
        ));
    }
}

