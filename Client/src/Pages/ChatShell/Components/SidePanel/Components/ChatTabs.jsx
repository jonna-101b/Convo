import useSelectedTabStatusHook from '../../../hooks/useSelectedTabStatusHook';

function ChatTabs() {
  const { tabStatus, setTabStatus } = useSelectedTabStatusHook();

  return (
    <div className="chat-tabs">
      <div
        className={`tab ${tabStatus === 'chats' ? 'active' : ''}`}
        onClick={() => setTabStatus('chats')}
      >
        Chats
      </div>
      <div
        className={`tab ${tabStatus === 'friends' ? 'active' : ''}`}
        onClick={() => setTabStatus('friends')}
      >
        Friends
      </div>
      <div
        className={`tab ${tabStatus === 'groups' ? 'active' : ''}`}
        onClick={() => setTabStatus('groups')}
      >
        Groups
      </div>
    </div>
  );
}

export default ChatTabs;
