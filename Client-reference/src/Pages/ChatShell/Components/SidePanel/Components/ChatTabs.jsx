import '../Styles/ChatTabs.css';


function Tab({tab}) {
        return (
                <div className="tab">
                        <p className="unread">{tab.unread}</p>

                        <p className="name">{tab.name}</p>
                </div>
        );
}

function ChatTabs() {
        const tabs = [{name: "Private", unread: 7}, {name: "Groups", unread: 5}, {name: "Archived", unread: 3}];

        return (
                <div className="chat-tabs">
                        { tabs.map((tab, index) => (
                                <Tab key={index} tab={tab} />
                        )) }
                </div>
        );
}

export default ChatTabs;