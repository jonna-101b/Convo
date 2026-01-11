import { format } from 'date-fns';
import useChatsHook from '../../../../../hooks/useChatsHook';
import useFriendsHook from '../../../../../hooks/useFriendsHook';
import useSelectedChatHook from '../../../hooks/useSelectedChatHook';
import useSelectedTabStatusHook from '../../../hooks/useSelectedTabStatusHook';
import usePopUpHook from '../../../hooks/usePopUpHook';

function Chat({ chat, selected, handleClick }) {
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return format(date, 'HH:mm');
    } catch {
      return '';
    }
  };

  return (
    <div
      className={`chat ${selected?.chatId === chat.chatId ? 'selected' : ''}`}
      onClick={() => handleClick(chat)}
    >
      <p className="profile-pic">
        {getInitials(chat.name)}
      </p>

      <div className="chat-content">
        <div className="name-time">
          <p className="username">{chat.name}</p>
          <p className="time">{formatTime(chat.lastMessageAt)}</p>
        </div>

        <div className="message-unread">
          <p className="message">
            {chat.lastMessage || 'No messages yet'}
          </p>
          {chat.unreadCount > 0 && (
            <p className="unread active">{chat.unreadCount}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FriendItem({ friend, handleClick }) {
  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
    return friend.username?.substring(0, 2).toUpperCase() || '?';
  };

  return (
    <div className="chat" onClick={() => handleClick(friend)}>
      <p className="profile-pic">
        {getInitials(friend.firstName, friend.lastName)}
      </p>

      <div className="chat-content">
        <div className="name-time">
          <p className="username">
            {friend.firstName && friend.lastName
              ? `${friend.firstName} ${friend.lastName}`
              : friend.username}
          </p>
        </div>

        <div className="message-unread">
          <p className="message">@{friend.username}</p>
        </div>
      </div>
    </div>
  );
}

function ChatList() {
  const { chats } = useChatsHook();
  const { friends } = useFriendsHook();
  const { selectedChat, setSelectedChat } = useSelectedChatHook();
  const { tabStatus } = useSelectedTabStatusHook();
  const { openPopUp } = usePopUpHook();

  const handleChatClick = async (chat) => {
    setSelectedChat(chat);
  };

  const handleFriendClick = async (friend) => {
    // Find existing chat or create direct chat
    const existingChat = chats.find(
      (chat) =>
        !chat.isGroup &&
        chat.participants?.some((p) => p.userId === friend.id)
    );

    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      // Would create a direct chat here
      const friendName = friend.firstName && friend.lastName
        ? `${friend.firstName} ${friend.lastName}`
        : friend.username;
      setSelectedChat({
        chatId: null,
        name: friendName,
        isGroup: false,
        otherUserId: friend.id,
      });
    }
  };

  if (tabStatus === 'chats') {
    if (chats.length === 0) {
      return (
        <div className="empty-state">
          <p>No chats yet</p>
          <p>Start a conversation with a friend!</p>
          <button onClick={() => openPopUp('search')}>Find Friends</button>
        </div>
      );
    }

    return (
      <div className="chat-list">
        {chats.map((chat) => (
          <Chat
            key={chat.chatId}
            chat={chat}
            selected={selectedChat}
            handleClick={handleChatClick}
          />
        ))}
      </div>
    );
  }

  if (tabStatus === 'friends') {
    if (friends.length === 0) {
      return (
        <div className="empty-state">
          <p>No friends yet</p>
          <p>Add some friends to start chatting!</p>
          <button onClick={() => openPopUp('search')}>Find Friends</button>
        </div>
      );
    }

    return (
      <div className="chat-list">
        {friends.map((friend) => (
          <FriendItem
            key={friend.id}
            friend={friend}
            handleClick={handleFriendClick}
          />
        ))}
      </div>
    );
  }

  if (tabStatus === 'groups') {
    const groupChats = chats.filter((chat) => chat.isGroup);

    if (groupChats.length === 0) {
      return (
        <div className="empty-state">
          <p>No groups yet</p>
          <p>Create a group to chat with multiple friends!</p>
          <button onClick={() => openPopUp('createGroup')}>Create Group</button>
        </div>
      );
    }

    return (
      <div className="chat-list">
        <button
          style={{ margin: '0.5rem 0 0.75rem', width: '100%' }}
          onClick={() => openPopUp('createGroup')}
        >
          + New Group
        </button>
        {groupChats.map((chat) => (
          <Chat
            key={chat.chatId}
            chat={chat}
            selected={selectedChat}
            handleClick={handleChatClick}
          />
        ))}
      </div>
    );
  }

  return null;
}

export default ChatList;
