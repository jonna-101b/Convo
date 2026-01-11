import useEmojiDisplayHook from "../../Hooks/useEmojiDisplayHook";
import PanelHeader from "./Components/PanelHeader";
import ChatTabs from "./Components/ChatTabs";
import ChatList from "./Components/ChatList";
import ChatSuggestions from "./Components/ChatSuggestions";
import PanelFooter from "./Components/PanelFooter";
import './SidePanel.css';

function SidePanel() {
        const { setDisplay } = useEmojiDisplayHook();

        const handleClick = () => {
                setDisplay(false);
        };
        
        return (
                <div className="side-panel" onClick={handleClick} >
                        <PanelHeader />

                        <ChatTabs />

                        <ChatList />

                        {/* <ChatSuggestions /> */}

                        <PanelFooter />
                </div>
        );
}

export default SidePanel;