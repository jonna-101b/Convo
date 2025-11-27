import PanelHeader from "./Components/PanelHeader";
import ChatTabs from "./Components/ChatTabs";
import ChatList from "./Components/ChatList";
import ChatSuggestions from "./Components/ChatSuggestions";
import PanelFooter from "./Components/PanelFooter";
import './SidePanel.css';

function SidePanel() {
        return (
                <div className="side-panel">
                        <PanelHeader />

                        <ChatTabs />

                        <ChatList />

                        {/* <ChatSuggestions /> */}

                        <PanelFooter />
                </div>
        );
}

export default SidePanel;