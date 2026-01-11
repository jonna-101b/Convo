import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { ProfileContextProvider } from './contexts/ProfileContext';
import { FriendsContextProvider } from './contexts/FriendsContext';
import { ChatsContextProvider } from './contexts/ChatsContext';
import Welcome from './pages/Welcome/Welcome';
import ChatShell from './pages/ChatShell/ChatShell';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthHook from './hooks/useAuthHook';
import './App.css';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome/*" element={<Welcome />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatShell />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <FriendsContextProvider>
          <ChatsContextProvider>
            <AppRoutes />
          </ChatsContextProvider>
        </FriendsContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default App;
