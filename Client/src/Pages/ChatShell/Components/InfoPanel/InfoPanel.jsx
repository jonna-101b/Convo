import useSelectedChatHook from '../../hooks/useSelectedChatHook';
import useInfoDisplayHook from '../../hooks/useInfoDisplayHook';
import './InfoPanel.css';

function InfoPanel() {
  const { selectedChat } = useSelectedChatHook();
  const { infoDisplay, setInfoDisplay } = useInfoDisplayHook();

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (!infoDisplay || !selectedChat) {
    return <div className="info-panel hidden" />;
  }

  return (
    <div className="info-panel">
      <div className="info-header">
        <h2>Chat Info</h2>
        <div className="close-btn" onClick={() => setInfoDisplay(false)}>
          ✕
        </div>
      </div>

      <div className="info-body">
        <div className="info-profile-pic">
          {getInitials(selectedChat.name)}
        </div>

        <div className="info-name">{selectedChat.name}</div>
        
        {selectedChat.isGroup && (
          <div className="info-username">Group Chat</div>
        )}

        <div className="info-section">
          <h3>About</h3>
          <p>
            {selectedChat.description || 'No description available'}
          </p>
        </div>

        {selectedChat.isGroup && (
          <div className="info-section">
            <h3>Participants</h3>
            <p>{selectedChat.participantCount || 0} members</p>
          </div>
        )}

        <div className="info-section">
          <h3>Media & Files</h3>
          <p>Shared media will appear here</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;
