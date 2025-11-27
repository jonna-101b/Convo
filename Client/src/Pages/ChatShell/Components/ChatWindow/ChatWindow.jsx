import ChatHeader from './Components/ChatHeader';
import ChatBody from './Components/ChatBody/ChatBody';
import './ChatWindow.css';

function  ChatWindow() {
        return (
                <div className="chat-window">
                        <ChatHeader />

                        <ChatBody />
                </div>
        );
}

export default ChatWindow;