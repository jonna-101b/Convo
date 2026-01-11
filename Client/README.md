# Convo Chat Application - Frontend

A modern React-based frontend for the Convo chat application, featuring real-time messaging, friend management, and group chats.

## Features

- **Authentication**: Login and registration with JWT
- **Real-time Messaging**: WebSocket-based instant messaging
- **Friend System**: Send and accept friend requests
- **Group Chats**: Create and manage group conversations
- **Direct Chats**: One-on-one conversations with friends
- **File Sharing**: Upload and share files (images, documents, etc.)
- **Modern UI**: Clean and responsive interface
- **Profile Management**: Update your profile and settings

## Tech Stack

- **React 19** - UI framework
- **React Router** - Navigation
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **SockJS & STOMP** - WebSocket communication
- **date-fns** - Date formatting
- **emoji-picker-react** - Emoji support

## Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on `http://localhost:8080`

## Installation

1. Navigate to the Client directory:
```bash
cd Client
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
Edit `.env` file to change API endpoints:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_WS_BASE_URL=http://localhost:8080/ws
```

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
Client/
├── src/
│   ├── components/         # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ProfileContext.jsx
│   │   ├── FriendsContext.jsx
│   │   └── ChatsContext.jsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuthHook.jsx
│   │   ├── useProfileHook.jsx
│   │   ├── useFriendsHook.jsx
│   │   └── useChatsHook.jsx
│   ├── pages/             # Page components
│   │   ├── Welcome/       # Landing page
│   │   │   ├── Welcome.jsx
│   │   │   └── components/
│   │   │       ├── NavBar/
│   │   │       ├── Home/
│   │   │       ├── About/
│   │   │       ├── Features/
│   │   │       ├── Contacts/
│   │   │       ├── Footer/
│   │   │       └── AuthModal/
│   │   └── ChatShell/     # Main chat interface
│   │       ├── ChatShell.jsx
│   │       ├── contexts/  # Chat-specific contexts
│   │       ├── hooks/     # Chat-specific hooks
│   │       └── components/
│   │           ├── SidePanel/
│   │           ├── ChatWindow/
│   │           ├── InfoPanel/
│   │           └── PopUp/
│   ├── services/          # API service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── chatService.js
│   │   ├── messageService.js
│   │   ├── friendService.js
│   │   ├── fileService.js
│   │   └── websocketService.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── public/
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Usage Guide

### Getting Started

1. **Sign Up**: Create a new account from the Welcome page
2. **Log In**: Use your credentials to access the chat interface
3. **Find Friends**: Use the search feature to find users by username
4. **Send Friend Requests**: Add friends to start chatting
5. **Start Chatting**: Select a friend or create a group to begin messaging

### Key Features

#### Authentication
- Register with username, email, and password
- Log in with username/email and password
- Automatic token management and session persistence

#### Messaging
- Real-time message delivery via WebSocket
- Send text messages and emojis
- Message history with timestamps
- Typing indicators (when implemented)

#### Friend Management
- Search users by username
- Send friend requests
- Accept/reject incoming requests
- View friend list
- Start direct conversations with friends

#### Group Chats
- Create group conversations
- Add multiple participants
- Manage group settings
- View group info and participants

#### Profile & Settings
- View your profile information
- Update profile details
- Change password
- Manage app settings
- Log out

## API Integration

The frontend communicates with the backend through:

### REST API Endpoints

- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Users**: `/api/users/*`
- **Chats**: `/api/chats/*`
- **Messages**: `/api/messages/*`
- **Friends**: `/api/friends/*`
- **Files**: `/api/files/*`
- **Settings**: `/api/settings/*`

### WebSocket

- Connection: `ws://localhost:8080/ws`
- Topics:
  - `/topic/chat/{chatId}` - Chat messages
  - `/topic/user/{userId}` - User notifications
  - `/app/chat/{chatId}/typing` - Typing indicators

## Development

### Code Style

- ES6+ JavaScript
- Functional components with hooks
- Context API for state management
- CSS modules for styling
- Axios for HTTP requests

### State Management

Global state is managed through React Context:
- **AuthContext**: Authentication state
- **ProfileContext**: User profile data
- **FriendsContext**: Friends and requests
- **ChatsContext**: Chat conversations

Chat-specific state:
- **SelectedChatContext**: Current chat
- **PopUpContext**: Modal dialogs
- **InfoDisplayContext**: Info panel visibility
- **SelectedTabStatusContext**: Active tab
- **EmojiDisplayContext**: Emoji picker

### Adding New Features

1. Create service methods in `src/services/`
2. Add context/hooks if needed in `src/contexts/` and `src/hooks/`
3. Build UI components in `src/pages/` or `src/components/`
4. Connect to backend API using the service layer

## Troubleshooting

### Connection Issues

If you can't connect to the backend:
1. Verify backend is running on `http://localhost:8080`
2. Check CORS configuration in backend
3. Verify `.env` configuration

### WebSocket Not Connecting

1. Ensure backend WebSocket endpoint is accessible
2. Check JWT token is valid
3. Verify SockJS/STOMP configuration matches backend

### Authentication Errors

1. Clear localStorage: `localStorage.clear()`
2. Log in again
3. Check token expiration settings

## Building for Production

1. Update `.env` with production API URLs
2. Build the application:
```bash
npm run build
```
3. Deploy the `dist/` folder to your hosting service

## Contributing

This project was built based on the reference client implementation with full backend API integration.

## License

MIT License

---

**Note**: This frontend is designed to work with the Convo Spring Boot backend. Make sure the backend server is running before starting the frontend application.
