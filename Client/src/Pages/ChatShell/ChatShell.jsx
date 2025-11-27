import SidePanel from "./Components/SidePanel/SidePanel";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import './ChatShell.css';


function ChatShell() {
        return (
                <div className="chat-shell">
                        <SidePanel />

                        <ChatWindow />
                </div>
        );
}

export default ChatShell;