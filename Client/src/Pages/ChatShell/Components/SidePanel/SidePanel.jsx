import PanelHeader from './components/PanelHeader';
import ChatTabs from './components/ChatTabs';
import ChatList from './components/ChatList';
import PanelFooter from './components/PanelFooter';
import './SidePanel.css';

function SidePanel() {
  return (
    <div className="side-panel">
      <PanelHeader />
      <ChatTabs />
      <ChatList />
      <PanelFooter />
    </div>
  );
}

export default SidePanel;
