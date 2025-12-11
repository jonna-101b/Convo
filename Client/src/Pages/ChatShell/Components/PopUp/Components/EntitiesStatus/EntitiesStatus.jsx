import { useRef, useState } from 'react';
import useFriendsHook from '../../../../../../Hooks/useFriendsHook';
import UseSelectHook from '../../../../Hooks/UseSelectHook';
import './EntitiesStatus.css';


function Entity({ picture, name, extraInfo, action }) {
        return (
                <div className="entity">
                        <p className="picture">
                                <img src="www.dsyfsdhjlfashj.com" />
                        </p>

                        <div className="details">
                                <div className="info">
                                        <p className="name">
                                                {name}
                                        </p>

                                        <p className="extra-info">
                                                {extraInfo}
                                        </p>
                                </div>

                                <p className={`action ${action ? null : "empty"}`}>
                                        {action}
                                </p>
                        </div>
                </div>
        );
}

function EntitiesStatus() {
        const { friends } = useFriendsHook();
        const { selected } = UseSelectHook();
        const status = "online";
        const [activeTab, setActiveTab] = useState("mutual");
        const tabIndicatorRef = useRef(null);

        const countUnread = (chats) => {
                let counter = 0;
                for (let chat of chats) {
                        if (!chat.seen) {
                                counter += 1;
                        }
                }

                return counter;
        };

        const handleTabClick = (tab, lengthStep) => {
                setActiveTab(tab);

                const tabIndicator = tabIndicatorRef.current;
                if (tabIndicator) {
                        console.log("Hello");
                        const stepSize = lengthStep * 33.3;
                        const gapSize = lengthStep * 2;
                        tabIndicator.style.transform = `calc(${stepSize}% + ${gapSize}vh)`;
                        tabIndicator.styles.transform = "10vh";
                }
        }

        return (
                <div className="entities-status" onClick={(event) => { event.stopPropagation() }} >
                        <div className="mini-profile">
                                <p className="image">
                                        <img src="www.siusclhscjcks.com" />
                                </p>

                                <div className="details">
                                        <p className="username">
                                                {selected.username}
                                        </p>

                                        <p className="status">
                                                {status}
                                        </p>
                                </div>
                        </div>

                        <div className="status-bar">
                                <div className={`mutual entity-labels ${activeTab === "mutual" ? "active" : null}`} onClick={() => { handleTabClick("mutual", 0) }} >
                                        <p className="value">
                                                {selected.mutualFriends}
                                        </p>

                                        <p className="label">
                                                Mutual
                                        </p>
                                </div>

                                <div className={`friends entity-labels ${activeTab === "friends" ? "active" : null}`} onClick={() => { handleTabClick("friends", 1) }} >
                                        <p className="value">
                                                {selected.totalFriends}
                                        </p>

                                        <p className="label">
                                                Friends
                                        </p>
                                </div>

                                <div className={`groups entity-labels ${activeTab === "groups" ? "active" : null}`} onClick={() => { handleTabClick("groups", 2) }} >
                                        <p className="value">
                                                {selected.groups}
                                        </p>

                                        <p className="label">
                                                Groups
                                        </p>
                                </div>

                                <p className="active-tab-indicator" ref={tabIndicatorRef} ></p>
                        </div>

                        <div className="list">
                                {friends.map((friend) => (
                                        <Entity
                                                key={friend._id}
                                                name={friend.username}
                                                extraInfo={friend.email}
                                                action={countUnread(friend.chatHistory)}
                                        />
                                ))}
                        </div>
                </div>
        );
}

export default EntitiesStatus;