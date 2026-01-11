# Convo Chat Backend - Quick Start Guide

## Prerequisites

- Java 23+
- Gradle (included with gradlew)

## Building the Project

### First Time Setup

```bash
cd "C:\Users\Kaleab\Desktop\Jonna\Convo\Server"
.\gradlew.bat clean build -x test
```

### Subsequent Builds

```bash
.\gradlew.bat build -x test
```

## Running the Application

### Option 1: Using Gradle

```bash
.\gradlew.bat bootRun
```

### Option 2: Using Java Directly

```bash
java -jar build/libs/convo-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## Database

The application uses H2 in-memory database which automatically initializes on startup.

### Access H2 Console

- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave blank)

## Testing the API

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 1,
  "username": "john_doe"
}
```

### 2. Login

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "john_doe",
    "password": "SecurePass123"
  }'
```

### 3. Get Current User (Authenticated)

```bash
curl -X GET http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Create a Direct Chat

First, create another user, then:

```bash
curl -X GET http://localhost:8080/api/chats/direct/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Send a Message

```bash
curl -X POST http://localhost:8080/api/messages \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": 1,
    "content": "Hello, this is a test message!"
  }'
```

### 6. Create a Group Chat

```bash
curl -X POST http://localhost:8080/api/chats/groups \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "groupName": "Development Team",
    "description": "Team chat for developers",
    "initialMemberIds": [1, 2, 3]
  }'
```

### 7. Send Friend Request

```bash
curl -X POST http://localhost:8080/api/friends/requests \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "receiverId": 2
  }'
```

### 8. Upload a File

```bash
curl -X POST http://localhost:8080/api/files/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/file.pdf"
```

### 9. Upload Profile Picture

```bash
curl -X POST http://localhost:8080/api/profile-pictures/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/profile.jpg"
```

## WebSocket Connection

### JavaScript Example

```javascript
// Connect to WebSocket
const sock = new SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(sock);

stompClient.connect({}, function (frame) {
  console.log("Connected: " + frame.command);

  // Subscribe to chat messages
  stompClient.subscribe("/topic/chat/1", function (message) {
    console.log("Received message:", JSON.parse(message.body));
  });

  // Subscribe to typing notifications
  stompClient.subscribe("/topic/chat/1/typing", function (notification) {
    console.log("User typing:", JSON.parse(notification.body));
  });
});

// Send a message
stompClient.send(
  "/app/chat/1",
  {},
  JSON.stringify({
    chatId: 1,
    userId: 1,
    username: "john_doe",
    content: "Hello everyone!",
    messageType: "TEXT",
    timestamp: Date.now(),
  })
);

// Send typing notification
stompClient.send(
  "/app/chat/1/typing",
  {},
  JSON.stringify({
    chatId: 1,
    userId: 1,
    username: "john_doe",
    isTyping: true,
  })
);
```

## Project Structure

```
src/main/java/com/myapp/chatapp/
├── config/                      # Configuration classes
│   ├── JwtProperties.java
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   ├── SecurityConfig.java
│   └── WebSocketConfig.java
├── controller/                  # REST API Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── UserSettingsController.java
│   ├── MessageController.java
│   ├── ChatController.java
│   ├── FriendController.java
│   ├── FileController.java
│   └── ProfilePictureController.java
├── domain/                      # JPA Entities
│   ├── User.java
│   ├── UserSettings.java
│   ├── Message.java
│   ├── Chat.java
│   ├── ChatParticipant.java
│   ├── FriendRequest.java
│   ├── Group.java
│   ├── FileMetadata.java
│   └── ProfilePicture.java
├── repository/                  # JPA Repositories
│   ├── UserRepository.java
│   ├── UserSettingsRepository.java
│   ├── MessageRepository.java
│   ├── ChatRepository.java
│   ├── ChatParticipantRepository.java
│   ├── FriendRequestRepository.java
│   ├── GroupRepository.java
│   ├── FileMetadataRepository.java
│   └── ProfilePictureRepository.java
├── service/                     # Business Logic Services
│   ├── UserService.java
│   ├── UserSettingsService.java
│   ├── MessageService.java
│   ├── ChatService.java
│   ├── FriendRequestService.java
│   ├── FileService.java
│   └── ProfilePictureService.java
├── websocket/                   # WebSocket Controllers
│   └── ChatWebSocketController.java
└── exception/                   # Exception Handling
    └── GlobalExceptionHandler.java
```

## Troubleshooting

### Build Issues

- Make sure Java 23+ is installed: `java -version`
- Clear gradle cache: `.\gradlew.bat clean`
- Check if port 8080 is available

### Runtime Issues

- Check application logs in console
- Verify JWT secret is configured
- Ensure database is initialized (check H2 console)

### Connection Issues

- Verify CORS settings in SecurityConfig
- Check if WebSocket endpoint is accessible
- Ensure SockJS is properly configured

## Important Notes

1. **JWT Secret**: The default secret in `application.properties` should be changed in production
2. **Database**: H2 in-memory database recreates on each startup - use persistent database for production
3. **File Uploads**: Stored in `uploads/` directory - configure persistent storage in production
4. **CORS**: Configured for localhost development - adjust origins in SecurityConfig for production
5. **Authentication**: All endpoints except `/api/auth/**` and `/api/users/check/**` require JWT token

## Common Error Codes

- `401 Unauthorized` - Invalid or missing JWT token
- `403 Forbidden` - User doesn't have permission for this action
- `404 Not Found` - Resource doesn't exist
- `400 Bad Request` - Invalid request data or validation failure
- `500 Internal Server Error` - Server-side error (check logs)

## Support

For issues or questions, check the IMPLEMENTATION.md file for detailed documentation.
