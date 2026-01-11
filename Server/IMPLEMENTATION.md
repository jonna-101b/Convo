# Convo Chat Application Backend - Implementation Summary

## Overview

This is a fully-implemented Spring Boot 4.0.1 REST API backend for a real-time chat application with support for direct messaging, group chats, file sharing, and WebSocket-based real-time notifications.

## Completed Features

### 1. **Authentication & Security**

- ✅ JWT-based authentication with JwtTokenProvider
- ✅ BCrypt password hashing and verification
- ✅ JwtAuthenticationFilter for request validation
- ✅ SecurityConfig with CORS and HTTP security configuration
- ✅ Protected endpoints requiring authentication
- ✅ Password strength validation (8-128 characters)

### 2. **User Management**

- ✅ User registration with email validation
- ✅ User login with JWT token generation
- ✅ Get user profile by ID or username
- ✅ Update user profile (first name, last name)
- ✅ Change password with current password verification
- ✅ Check username/email availability
- ✅ Get active users list
- ✅ User activation/deactivation

### 3. **User Settings**

- ✅ Create default user settings
- ✅ Get user settings
- ✅ Update theme (light/dark/auto)
- ✅ Toggle notifications
- ✅ Toggle sound
- ✅ Update status visibility (public/friends/private)
- ✅ Batch update settings

### 4. **Direct Messaging**

- ✅ Send text messages
- ✅ Send file messages (with FileMetadata linking)
- ✅ Edit messages
- ✅ Delete messages (soft delete with isDeleted flag)
- ✅ Get messages by chat (with pagination)
- ✅ Get active messages (non-deleted)
- ✅ Get recent messages
- ✅ Get messages sent by current user
- ✅ Participant access validation

### 5. **Chat Management**

- ✅ Create direct chats between users
- ✅ Create group chats with initial members
- ✅ Get chat by ID
- ✅ Get all chats for user
- ✅ Get direct chat between two users
- ✅ Add participants to group (admin only)
- ✅ Remove participants from group (admin only)
- ✅ Update group info (name, description) - admin only
- ✅ Change participant role (MEMBER/ADMIN/OWNER)
- ✅ Leave group chat
- ✅ Get chat participants
- ✅ Get active participants

### 6. **Friend System**

- ✅ Send friend requests
- ✅ Accept friend request (creates direct chat)
- ✅ Reject friend request
- ✅ Cancel friend request
- ✅ Get pending received requests
- ✅ Get pending sent requests
- ✅ Get all requests for user
- ✅ Get friend request by ID
- ✅ Get friends list
- ✅ Prevent duplicate/existing friend requests
- ✅ Friend status: PENDING, ACCEPTED, REJECTED, CANCELLED

### 7. **File Management**

- ✅ Upload files with metadata tracking
- ✅ Validate file size (max 100MB)
- ✅ Validate file types (images, documents, audio, video)
- ✅ Validate content type
- ✅ Get file metadata
- ✅ Delete file (physical and metadata)
- ✅ Attach files to messages
- ✅ Download files
- ✅ Support for multiple file types: IMAGE, DOCUMENT, AUDIO, VIDEO, OTHER

### 8. **Profile Pictures**

- ✅ Upload user profile picture
- ✅ Upload group profile picture
- ✅ Get user profile picture
- ✅ Get group profile picture
- ✅ Delete profile picture
- ✅ Prevent multiple profile pictures (auto-delete old ones)

### 9. **WebSocket Real-Time Features**

- ✅ Chat message broadcasting (/app/chat/{chatId} → /topic/chat/{chatId})
- ✅ Typing notifications (/app/chat/{chatId}/typing)
- ✅ User status updates (/app/user/status)
- ✅ SockJS support for browsers without WebSocket
- ✅ CORS configured for WebSocket connections

### 10. **Database**

- ✅ H2 in-memory database (configurable to other DBs)
- ✅ JPA/Hibernate ORM
- ✅ Auto DDL generation (create-drop)
- ✅ Proper entity relationships and cascades
- ✅ Audit timestamps (createdAt, updatedAt)

### 11. **Error Handling**

- ✅ Global exception handler
- ✅ Validation error responses
- ✅ Proper HTTP status codes
- ✅ Structured error response format

### 12. **Data Transfer Objects (DTOs)**

All DTOs have proper validation annotations:

- ✅ LoginRequest
- ✅ RegisterRequest
- ✅ AuthResponse
- ✅ SendMessageRequest
- ✅ EditMessageRequest
- ✅ SendFileMessageRequest
- ✅ CreateGroupChatRequest
- ✅ AddParticipantRequest
- ✅ ChangeRoleRequest
- ✅ UpdateGroupRequest
- ✅ SendFriendRequestRequest
- ✅ UpdateProfileRequest
- ✅ ChangePasswordRequest
- ✅ UpdateSettingsRequest

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Users

- `GET /api/users/me` - Get current user profile
- `GET /api/users/{userId}` - Get user by ID
- `GET /api/users/username/{username}` - Get user by username
- `PUT /api/users/me/profile` - Update profile
- `PUT /api/users/me/password` - Change password
- `GET /api/users/active` - Get all active users
- `GET /api/users/check/username/{username}` - Check username availability
- `GET /api/users/check/email/{email}` - Check email availability

### User Settings

- `GET /api/users/me/settings` - Get user settings
- `POST /api/users/me/settings` - Create default settings
- `PUT /api/users/me/settings` - Update all settings
- `PUT /api/users/me/settings/theme` - Update theme
- `PUT /api/users/me/settings/notifications` - Update notifications
- `PUT /api/users/me/settings/sound` - Update sound
- `PUT /api/users/me/settings/status-visibility` - Update status visibility

### Messages

- `POST /api/messages` - Send text message
- `POST /api/messages/file` - Send file message
- `GET /api/messages/{messageId}` - Get message by ID
- `GET /api/messages/chat/{chatId}` - Get messages for chat (paginated)
- `GET /api/messages/chat/{chatId}/active` - Get active messages (paginated)
- `GET /api/messages/chat/{chatId}/recent` - Get recent messages
- `PUT /api/messages/{messageId}` - Edit message
- `DELETE /api/messages/{messageId}` - Delete message
- `GET /api/messages/sent` - Get sent messages (paginated)

### Chats

- `POST /api/chats/groups` - Create group chat
- `GET /api/chats` - Get all user's chats
- `GET /api/chats/{chatId}` - Get chat by ID
- `GET /api/chats/direct/{userId}` - Get or create direct chat
- `POST /api/chats/{chatId}/participants` - Add participant
- `DELETE /api/chats/{chatId}/participants/{userId}` - Remove participant
- `PUT /api/chats/{chatId}/group` - Update group info
- `PUT /api/chats/{chatId}/participants/role` - Change participant role
- `POST /api/chats/{chatId}/leave` - Leave group chat
- `GET /api/chats/{chatId}/participants` - Get all participants
- `GET /api/chats/{chatId}/participants/active` - Get active participants

### Friends

- `POST /api/friends/requests` - Send friend request
- `POST /api/friends/requests/{requestId}/accept` - Accept friend request
- `POST /api/friends/requests/{requestId}/reject` - Reject friend request
- `DELETE /api/friends/requests/{requestId}` - Cancel friend request
- `GET /api/friends/requests/pending/received` - Get pending received requests
- `GET /api/friends/requests/pending/sent` - Get pending sent requests
- `GET /api/friends/requests` - Get all requests for user
- `GET /api/friends/requests/{requestId}` - Get request by ID
- `GET /api/friends/list` - Get friends list

### Files

- `POST /api/files/upload` - Upload file
- `GET /api/files/{fileMetadataId}` - Download file
- `DELETE /api/files/{fileMetadataId}` - Delete file
- `GET /api/files/{fileMetadataId}/metadata` - Get file metadata

### Profile Pictures

- `POST /api/profile-pictures/users/{userId}` - Upload user profile picture
- `POST /api/profile-pictures/groups/{groupId}` - Upload group profile picture
- `GET /api/profile-pictures/users/{userId}` - Get user profile picture
- `GET /api/profile-pictures/groups/{groupId}` - Get group profile picture
- `DELETE /api/profile-pictures/{pictureId}` - Delete profile picture

### WebSocket

- Base URL: `ws://localhost:8080/ws` (with SockJS fallback)
- Publish to `/app/chat/{chatId}` → Subscribe to `/topic/chat/{chatId}`
- Publish to `/app/chat/{chatId}/typing` → Subscribe to `/topic/chat/{chatId}/typing`
- Publish to `/app/user/status` → Subscribe to `/topic/user-status`

## Configuration

### JWT Properties

```properties
jwt.secret=your-secret-key-change-this-in-production-minimum-32-characters-long
jwt.expirationMs=86400000
```

### Database

- Type: H2 (in-memory)
- Auto DDL: `create-drop` (recreates on each startup - for development)
- Console: Available at `http://localhost:8080/h2-console`

### CORS

- Allowed Origins: `http://localhost:3000`, `http://localhost:3001`, `http://localhost:5173`
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
- Credentials: Allowed

## Technology Stack

- **Framework**: Spring Boot 4.0.1
- **Language**: Java 23
- **Database**: H2 (configurable)
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + JWT (jjwt 0.12.5)
- **Real-time**: WebSocket with SockJS
- **Build**: Gradle
- **Validation**: Jakarta Bean Validation

## Building and Running

### Build

```bash
./gradlew build -x test
```

### Run

```bash
./gradlew bootRun
```

The application will start on `http://localhost:8080`

## Key Classes

### Configuration

- `SecurityConfig` - Security configuration with JWT filter
- `JwtTokenProvider` - JWT token generation and validation
- `JwtAuthenticationFilter` - JWT authentication filter
- `WebSocketConfig` - WebSocket message broker configuration
- `GlobalExceptionHandler` - Global error handling

### Controllers

- `AuthController` - Authentication endpoints
- `UserController` - User management endpoints
- `UserSettingsController` - User settings endpoints
- `MessageController` - Message endpoints
- `ChatController` - Chat management endpoints
- `FriendController` - Friend system endpoints
- `FileController` - File upload/download endpoints
- `ProfilePictureController` - Profile picture management endpoints
- `ChatWebSocketController` - WebSocket message handlers

### Services

- `UserService` - User management business logic
- `UserSettingsService` - User settings business logic
- `MessageService` - Message business logic
- `ChatService` - Chat management business logic
- `FriendRequestService` - Friend system business logic
- `FileService` - File management business logic
- `ProfilePictureService` - Profile picture management business logic

### Repositories

- `UserRepository` - User data access
- `UserSettingsRepository` - User settings data access
- `MessageRepository` - Message data access
- `ChatRepository` - Chat data access
- `ChatParticipantRepository` - Chat participant data access
- `FriendRequestRepository` - Friend request data access
- `GroupRepository` - Group data access
- `FileMetadataRepository` - File metadata data access
- `ProfilePictureRepository` - Profile picture data access

### Domain Entities

- `User` - User entity
- `UserSettings` - User settings entity
- `Message` - Message entity
- `Chat` - Chat entity
- `ChatParticipant` - Chat participant entity
- `FriendRequest` - Friend request entity
- `Group` - Group entity
- `FileMetadata` - File metadata entity
- `ProfilePicture` - Profile picture entity

## Security Features

- JWT-based stateless authentication
- BCrypt password hashing
- CORS protection
- CSRF disabled (JWT stateless)
- Participant access validation for messages and chats
- Role-based access control (MEMBER, ADMIN, OWNER)
- Password strength validation
- Email validation

## Notes

- All timestamps use UTC Instant for consistency
- Soft deletes used for messages (isDeleted flag)
- Cascade operations configured appropriately for entity relationships
- Direct chats can only be created through friend request acceptance
- File uploads stored in `uploads/` directory (configurable)
- Profile pictures stored in `uploads/profile-pictures/` directory
- H2 database recreated on each startup (create-drop strategy)
- All services use @Transactional for proper transaction management

## Future Enhancements

- Add support for message reactions/emoji
- Implement message read receipts
- Add voice/video call integration
- Implement message search functionality
- Add end-to-end encryption option
- Implement message forwarding
- Add message pinning in groups
- Implement scheduled message sending
- Add story/status feature like WhatsApp
- Implement message backup functionality
