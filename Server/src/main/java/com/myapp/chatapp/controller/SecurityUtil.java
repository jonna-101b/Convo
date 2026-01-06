package com.myapp.chatapp.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Utility class to extract user information from JWT security context
 * Assumes SecurityContext is populated with authenticated user
 */
public class SecurityUtil {

    /**
     * Extract user ID from JWT security context
     * @return User ID from authenticated principal
     * @throws IllegalStateException if user is not authenticated
     */
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new IllegalStateException("User is not authenticated");
        }
        
        // Assuming principal contains userId as String or Long
        Object principal = authentication.getPrincipal();
        if (principal instanceof Long) {
            return (Long) principal;
        } else if (principal instanceof String) {
            return Long.parseLong((String) principal);
        } else {
            // If using custom UserDetails, extract userId from it
            // This is a placeholder - adjust based on your security implementation
            throw new IllegalStateException("Unable to extract user ID from principal");
        }
    }
}

