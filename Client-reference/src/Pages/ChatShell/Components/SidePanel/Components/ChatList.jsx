import useFriendsHook from '../../../../../Hooks/useFriendsHook';
import UseSelectHook from '../../../Hooks/UseSelectHook';
import '../Styles/ChatList.css';


function Chat({ chat, selected, handleClick }) {
        const lastMessage = chat.chatHistory[chat.chatHistory.length - 1];
        
        const countUnread = (chats) => {
                let counter = 0;
                for (let chat of chats) {
                        if (chat.owner === "friend" && !chat.seen) {
                                counter += 1;
                        }
                }

                return counter;
        };

        return (
                <div className={`chat ${ selected._id === chat._id ? "selected" : null }`} onClick={() => { handleClick(chat) }} >
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

                                        <p className={`unread ${ countUnread(chat.chatHistory) ? "active" : null }`}>
                                                { countUnread(chat.chatHistory) }
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

function ChatList() {     
        const { friends } = useFriendsHook();
        const { selected, setSelected } = UseSelectHook();
        
        const handleClick = (option) => {
                setSelected(option);
        };

        return (
                <div className="chat-list">
                        { friends.map((friend) => (
                                <Chat key={friend._id} selected={selected} chat={friend} handleClick={handleClick} />
                        )) }
                </div>
        );
}

export default ChatList;