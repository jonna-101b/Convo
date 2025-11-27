import friends from '../../../../../Mock/Chats';
import '../Styles/ChatList.css';


function Chat({ chat }) {
        const lastMessage = chat.chatHistory[chat.chatHistory.length - 1];
        const unread = 3;
        return (
                <div className="chat">
                        <p className="profile-pic">
                                <img src="www.eadjdkdkdkd.com"/>
                        </p>

                        <div className="chat-content">
                                <div className="name-time">
                                        <p className="username">
                                                { chat.username }
                                        </p>

                                        <p className="time">
                                                { lastMessage ? lastMessage.time : null }
                                        </p>
                                </div>

                                <div className="message-unread">
                                        <p className="message">
                                                { lastMessage ? lastMessage.message: null }
                                        </p>

                                        <p className="unread">
                                                { unread }
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

function ChatList() {              
        return (
                <div className="chat-list">
                        { friends.map((friend, index) => (
                                <Chat key={index} chat={friend} />
                        )) }
                </div>
        );
}

export default ChatList;