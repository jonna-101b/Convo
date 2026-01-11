import ChatArea from './Components/ChatArea';
import ChatToolbar from './Components/ChatToolbar';
import './ChatBody.css';


function ChatBody() {
        return (
                <div className="chat-body">
                        <ChatArea />

                        <ChatToolbar />
                </div>
        );
}

export default ChatBody;