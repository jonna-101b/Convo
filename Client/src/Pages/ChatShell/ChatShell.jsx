import { useEffect } from 'react';
import { SelectedChatContextProvider } from './contexts/SelectedChatContext';
import { PopUpContextProvider } from './contexts/PopUpContext';
import { InfoDisplayContextProvider } from './contexts/InfoDisplayContext';
import { SelectedTabStatusContextProvider } from './contexts/SelectedTabStatusContext';
import { EmojiDisplayContextProvider } from './contexts/EmojiDisplayContext';
import SidePanel from './components/SidePanel/SidePanel';
import ChatWindow from './components/ChatWindow/ChatWindow';
import InfoPanel from './components/InfoPanel/InfoPanel';
import PopUp from './components/PopUp/PopUp';
import websocketService from '../../services/websocketService';
import './ChatShell.css';

function ChatShell() {
  useEffect(() => {
    // Connect to WebSocket when ChatShell mounts
    const token = localStorage.getItem('token');
    if (token) {
      websocketService.connect(token).catch(error => {
        console.error('Failed to connect to WebSocket:', error);
      });
    }

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
  }, []);

  return (
    <SelectedChatContextProvider>
      <PopUpContextProvider>
        <InfoDisplayContextProvider>
          <SelectedTabStatusContextProvider>
            <EmojiDisplayContextProvider>
              <div className="chat-shell">
                <SidePanel />
                <ChatWindow />
                <InfoPanel />
                <PopUp />
              </div>
            </EmojiDisplayContextProvider>
          </SelectedTabStatusContextProvider>
        </InfoDisplayContextProvider>
      </PopUpContextProvider>
    </SelectedChatContextProvider>
  );
}

export default ChatShell;
