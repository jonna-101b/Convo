import { useState } from 'react';
import SearchIcon from '../../../../../../assets/Icons/ChatShell/PopUp/search.png';
import useFriendsHook from '../../../../../../Hooks/useFriendsHook';
import './SearchPanel.css';


function Entity({ picture, name, extraInfo, action }) {
        return (
                <div className="entity">
                        <p className="picture">
                                <img src="www.dsyfsdhjlfashj.com" />
                        </p>

                        <div className="details">
                                <div className="info">
                                        <p className="name">
                                                { name }
                                        </p>

                                        <p className="extra-info">
                                                { extraInfo }
                                        </p>
                                </div>

                                <p className={`action ${action ? null : "empty"}`}>
                                        { action }
                                </p>
                        </div>
                </div>
        );
}

function SearchPanel() {
        const { friends } = useFriendsHook();
        const [ input, setInput ] = useState("");
        
        const handleInput = (event) => {
                const message = event.target.value;
                setInput(message);
        };

        const countUnread = (chats) => {
                let counter = 0;
                for (let chat of chats) {
                        if (!chat.seen) {
                                counter += 1;
                        }
                }

                return counter;
        };

        return (
                <div className="search-panel" onClick={(event) => {event.stopPropagation()}} >
                        <p className="title">
                                Search
                        </p>

                        <div className="search-bar">
                                <p className="icon">
                                        <img src={SearchIcon} alt="Search icon" />
                                </p>
                                
                                <p className="input">
                                        <input 
                                                type="text"
                                                name="message" 
                                                id="message" 
                                                placeholder="Search..." 
                                                value={input}
                                                onChange={handleInput}
                                        >
                                        </input>
                                </p>
                        </div>
 
                        <div className="close-friends">
                                <p className="label">
                                        Close friends
                                </p>

                                <div className="list">
                                        { friends.map((friend) => (
                                                <div className="close-friend"  key={friend._id} >
                                                        <p className="picture">
                                                                <img src="www.usiahjsciajca.com" />
                                                        </p>

                                                        <p className="name">
                                                                { friend.username }
                                                        </p>
                                                </div>
                                        )) }
                                </div>
                        </div>
 
                        <div className="friends search-action">
                                <p className="label">
                                        Friends
                                </p>

                                { friends.map((friend) => (
                                        <Entity 
                                                key={friend._id}
                                                name={friend.username}
                                                extraInfo={friend.email}
                                                action={countUnread(friend.chatHistory)}
                                        />
                                )) }
                        </div>
                </div>
        );
}

export default SearchPanel;