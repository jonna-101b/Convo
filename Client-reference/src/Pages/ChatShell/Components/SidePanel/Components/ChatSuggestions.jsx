import useFriendsHook from '../../../../../Hooks/useFriendsHook';
import '../Styles/ChatSuggestions.css';


function Suggestion({ suggestion }) {
        return (
                <div className="suggestion">
                        <p className="image"></p>

                        <div className="detail">
                                <p className="name">
                                        { suggestion.username }
                                </p>

                                <p className="mutual-count">
                                        { suggestion.mutualFriends }
                                </p>
                        </div>
                </div>
        );
}

function ChatSuggestions() {  
        const { friends } = useFriendsHook();

        return (
                <div className="chat-suggestions">
                        <div className="text">
                                <p className="title">
                                        Friend suggestions
                                </p>

                                <p className="more">
                                        more
                                </p>
                        </div>

                        <div className="suggestions">
                                { friends.map((friend, index) => (
                                        <Suggestion key={index} suggestion={friend} />
                                )) }
                        </div>
                </div>
        );
}

export default ChatSuggestions;