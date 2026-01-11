package com.myapp.chatapp.controller;

import com.myapp.chatapp.config.JwtTokenProvider;
import com.myapp.chatapp.controller.dto.AuthResponse;
import com.myapp.chatapp.controller.dto.LoginRequest;
import com.myapp.chatapp.controller.dto.RegisterRequest;
import com.myapp.chatapp.domain.User;
import com.myapp.chatapp.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        Long userId = userService.createUser(
                request.username(),
                request.email(),
                request.password(),
                request.firstName(),
                request.lastName());

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(userId, request.username());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new AuthResponse(token, userId, request.username()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        // Find user by username or email
        var userOpt = userService.getUserByUsername(request.usernameOrEmail())
                .or(() -> userService.getUserByEmail(request.usernameOrEmail()));

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Get the actual User entity to verify password
        Optional<User> actualUser = userService.getActualUser(request.usernameOrEmail());
        if (actualUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Verify password
        if (!userService.verifyPassword(request.password(), actualUser.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(userOpt.get().id(), userOpt.get().username());

        return ResponseEntity.ok(new AuthResponse(
                token,
                userOpt.get().id(),
                userOpt.get().username()));
    }
}
