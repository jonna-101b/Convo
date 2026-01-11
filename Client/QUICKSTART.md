# Quick Start Guide - Convo Chat Frontend

## Prerequisites

Before starting, ensure you have:
1. **Node.js 16+** installed
2. **npm** or **yarn** package manager
3. **Backend server** running on `http://localhost:8080`

## Installation Steps

### 1. Install Dependencies

```bash
cd Client
npm install
```

If you encounter network issues, try:
```bash
npm install --registry=https://registry.npmjs.org/
```

Or use yarn:
```bash
yarn install
```

### 2. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Backend Setup

Make sure your Spring Boot backend is running:

```bash
cd ../Server
.\gradlew.bat bootRun
```

Backend should be accessible at `http://localhost:8080`

## First Time Usage

### 1. Create an Account

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" button
3. Fill in:
   - First Name
   - Last Name
   - Email
   - Username
   - Password
4. Click "Sign Up"

### 2. Log In

1. Click "Log In" button
2. Enter your username/email and password
3. Click "Log In"

You'll be redirected to the chat interface!

### 3. Find Friends

1. In the chat interface, click the search icon (🔍) in the top right
2. Enter a username to search
3. Click "Add Friend" to send a friend request

### 4. Accept Friend Requests

1. Click the radar icon (🎯) to view friend requests
2. Accept or reject pending requests

### 5. Start Chatting

1. Go to the "Friends" tab in the sidebar
2. Click on a friend to start a conversation
3. Type your message and press Enter or click the send button

## Features Overview

### Welcome Page (`/welcome`)
- Home: Introduction and hero section
- About: Information about the application
- Features: List of key features
- Contacts: Contact information
- Login/Signup: Authentication modals

### Chat Interface (`/chat`)

#### Left Sidebar (SidePanel)
- **Header**: Logo and action buttons
  - 🎯 Social Radar: View friend requests
  - 🔍 Search: Find new friends
  - ⚙️ Settings: Profile and logout
- **Tabs**: Switch between Chats, Friends, and Groups
- **Chat List**: Your conversations
- **Footer**: Your profile info

#### Center Panel (ChatWindow)
- **Header**: Chat name and info button
- **Body**: Message history
- **Input**: Send messages

#### Right Panel (InfoPanel)
- Chat details
- Participants (for groups)
- Shared media

#### Popup Dialogs
- **Settings**: Profile info and logout
- **Search**: Find users by username
- **Social Radar**: Manage friend requests

## Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **Esc**: Close popup dialogs

## API Endpoints (Backend Required)

The frontend expects these backend endpoints:

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Log in

### Users
- `GET /api/users/me` - Get current user
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/username/{username}` - Search by username
- `PUT /api/users/me/profile` - Update profile

### Chats
- `GET /api/chats` - Get all chats
- `GET /api/chats/{id}` - Get chat details
- `GET /api/chats/direct/{userId}` - Get or create direct chat
- `POST /api/chats/groups` - Create group chat

### Messages
- `GET /api/messages/chat/{chatId}/recent` - Get recent messages
- `POST /api/messages` - Send message
- `PUT /api/messages/{id}` - Edit message
- `DELETE /api/messages/{id}` - Delete message

### Friends
- `GET /api/friends` - Get friends list
- `GET /api/friends/requests` - Get friend requests
- `POST /api/friends/requests` - Send friend request
- `POST /api/friends/requests/{id}/accept` - Accept request
- `POST /api/friends/requests/{id}/reject` - Reject request

### WebSocket
- Connect to: `ws://localhost:8080/ws`
- Subscribe to: `/topic/chat/{chatId}` for messages

## Troubleshooting

### "Cannot connect to backend"
- Check if backend is running: `http://localhost:8080`
- Verify CORS settings in backend
- Check `.env` file configuration

### "WebSocket connection failed"
- Ensure backend WebSocket endpoint is enabled
- Verify JWT token is valid
- Check browser console for errors

### "Authentication failed"
- Clear browser storage: Open DevTools > Application > Storage > Clear
- Try logging in again
- Check username/password

### "Friend request not working"
- Ensure both users are registered
- Check backend friend service is running
- Verify user exists in search

### npm install fails
- Check internet connection
- Try different registry: `npm config set registry https://registry.npmjs.org/`
- Delete `node_modules` and `package-lock.json`, then retry

## Development Tips

### Hot Reload
Changes to files automatically reload the browser during development.

### Component Structure
- Pages are in `src/pages/`
- Reusable components in `src/components/`
- API services in `src/services/`
- State management in `src/contexts/` and `src/hooks/`

### Adding New Features
1. Create service function in appropriate service file
2. Add hook if needed for state management
3. Build UI component
4. Connect to service layer

### Styling
- Global variables in `src/App.css`
- Component-specific styles in same directory as component
- Use CSS variables for consistent theming

## Production Deployment

1. Update `.env` with production URLs:
```env
VITE_API_BASE_URL=https://your-backend.com
VITE_WS_BASE_URL=wss://your-backend.com/ws
```

2. Build for production:
```bash
npm run build
```

3. Deploy the `dist/` folder to your hosting service (Vercel, Netlify, etc.)

## Testing Locally

### Test User Registration
```bash
# Using curl
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "testuser",
    "password": "password123"
  }'
```

## Need Help?

- Check [README.md](README.md) for full documentation
- Review backend documentation in `../Server/README.md`
- Check browser console for errors (F12)
- Verify network requests in DevTools Network tab

---

**Ready to chat!** 🎉

Once dependencies are installed and the backend is running, you're all set to start using Convo!
