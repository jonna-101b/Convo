import { useRef, useState } from 'react';
import useFriendsHook from '../../../../../../Hooks/useFriendsHook';
import useGroupsHook from '../../../../../../Hooks/useGroupsHook';
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

function EntityLabel({ label, activeTab, handleTabClick }) {
        return (
                <div className={`${label.name.toLowerCase()} entity-labels ${activeTab === label.name.toLowerCase() ? "active" : null}`} onClick={() => { handleTabClick(label.name.toLowerCase(), label._id) }} >
                        <p className="value">
                                { label.value }
                        </p>

                        <p className="label">
                                { label.name }
                        </p>
                </div>
        );
}

function EntitiesStatus() {
        const { friends } = useFriendsHook();
        const { groups } = useGroupsHook();
        const { selected } = UseSelectHook();
        const status = "online";
        const [activeTab, setActiveTab] = useState("mutual");
        const tabIndicatorRef = useRef(null);
        const entityLabels = [
                {
                        _id: 0,
                        name: "Mutual",
                        value: selected.mutualFriends
                },
                {
                        _id: 1,
                        name: "Friends",
                        value: selected.totalFriends
                },
                {
                        _id: 2,
                        name: "Groups",
                        value: selected.groups
                },
        ];
        const entities = { "mutual": friends, "friends": friends, "groups": groups };

        const countUnread = (chats) => {
                let counter = 0;
                for (let chat of chats) {
                        if ( chat.owner != "you" && !chat.seen ) {
                                counter += 1;
                        }
                }

                return counter;
        };

        const handleTabClick = (tab, lengthStep) => {
                setActiveTab(tab);

                const tabIndicator = tabIndicatorRef.current;
                if (tabIndicator) {
                        const stepSize = lengthStep * tabIndicator.offsetWidth;
                        const gapSize = lengthStep * 2;
                        tabIndicator.style.transform = `translateX(calc(${stepSize}px + ${gapSize}vh))`;
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
                                { entityLabels.map((label) => (
                                        <EntityLabel key={label} label={label} activeTab={activeTab} handleTabClick={handleTabClick} />
                                )) }

                                <p className="active-tab-indicator" ref={tabIndicatorRef} ></p>
                        </div>

                        <div className="list">
                                {entities[activeTab].map((entity) => (
                                        <Entity
                                                key={entity._id}
                                                name={entity.username ? entity.username : entity.groupName}
                                                extraInfo={entity.email ? entity.email : entity.members}
                                                action={countUnread(entity.chatHistory)}
                                        />
                                ))}
                        </div>
                </div>
        );
}

export default EntitiesStatus;