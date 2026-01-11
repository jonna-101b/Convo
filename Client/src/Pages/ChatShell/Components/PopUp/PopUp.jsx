import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePopUpHook from '../../hooks/usePopUpHook';
import useAuthHook from '../../../../hooks/useAuthHook';
import useProfileHook from '../../../../hooks/useProfileHook';
import useFriendsHook from '../../../../hooks/useFriendsHook';
import { authService } from '../../../../services/authService';
import { userService } from '../../../../services/userService';
import useChatsHook from '../../../../hooks/useChatsHook';
import './PopUp.css';
function SettingsPopUp() {
  const { profile } = useProfileHook();
  const { logout } = useAuthHook();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <div className="popup-body">
      <div className="settings-section">
        <h3>Profile</h3>
        <div className="settings-item">
          <label>Username</label>
          <span>@{profile?.username || 'N/A'}</span>
        </div>
        <div className="settings-item">
          <label>Email</label>
          <span>{profile?.email || 'N/A'}</span>
        </div>
        <div className="settings-item">
          <label>Name</label>
          <span>
            {profile?.firstName && profile?.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : 'N/A'}
          </span>
        </div>
      </div>

      <div className="settings-section">
        <h3>Account</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

function SearchPopUp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendFriendRequest } = useFriendsHook();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      const user = await userService.getUserByUsername(searchQuery.trim());
      setSearchResults(user ? [user] : []);
    } catch (error) {
      console.error('Error searching users:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId) => {
    try {
      await sendFriendRequest(userId);
      alert('Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request');
    }
  };

  return (
    <div className="popup-body">
      <input
        type="text"
        className="search-input"
        placeholder="Search by username..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          background: 'var(--system-accent-color)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--tertiary-border-radius)',
          fontWeight: 'var(--primary-font-weight)',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <div className="search-results">
        {searchResults.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--secondary-font-color-light-mode)' }}>
            {searchQuery ? 'No users found' : 'Enter a username to search'}
          </p>
        ) : (
          searchResults.map((user) => (
            <div key={user.id} className="search-result-item">
              <div className="search-result-info">
                <div className="search-result-name">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username}
                </div>
                <div className="search-result-username">@{user.username}</div>
              </div>
              <button onClick={() => handleAddFriend(user.id)}>
                Add Friend
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SocialRadarPopUp() {
  const { requests, acceptFriendRequest, rejectFriendRequest } = useFriendsHook();
  const { refreshChats } = useChatsHook();
  const currentUserId = authService.getCurrentUserId();

  const pendingReceived = requests.filter(
    (req) => req.status === 'PENDING' && String(req.receiverId) === String(currentUserId)
  );

  const handleAccept = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
      await refreshChats();
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  return (
    <div className="popup-body">
      <h3>Friend Requests</h3>
      {pendingReceived.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--secondary-font-color-light-mode)', padding: '2rem' }}>
          No pending friend requests
        </p>
      ) : (
        <div className="search-results">
          {pendingReceived.map((request) => (
            <div key={request.id} className="search-result-item">
              <div className="search-result-info">
                <div className="search-result-name">
                  {request.senderUsername || 'Unknown'}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleAccept(request.id)}>
                  Accept
                </button>
                <button
                  onClick={() => rejectFriendRequest(request.id)}
                  style={{ background: 'var(--negative-background-color)' }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CreateGroupPopUp() {
  const { friends } = useFriendsHook();
  const { createGroupChat, refreshChats } = useChatsHook();
  const { closePopUp } = usePopUpHook();
  const currentUserId = authService.getCurrentUserId();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!groupName.trim()) {
      setError('Group name is required');
      return;
    }
    const uniqueIds = Array.from(
      new Set([currentUserId, ...selectedIds].filter(Boolean))
    );

    if (uniqueIds.length < 2) {
      setError('Add at least one member');
      return;
    }

    try {
      setSaving(true);
      setError('');
      await createGroupChat(groupName.trim(), description.trim(), uniqueIds);
      await refreshChats();
      closePopUp();
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Failed to create group');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="popup-body">
      <div className="settings-section">
        <h3>Create Group</h3>
        <div className="settings-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <label>Group name</label>
          <input
            className="search-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Team Sync"
          />
        </div>
        <div className="settings-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <label>Description</label>
          <textarea
            className="search-input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="settings-section">
        <h3>Select members</h3>
        <div className="search-results" style={{ maxHeight: '260px', overflowY: 'auto' }}>
          {friends.length === 0 ? (
            <p style={{ color: 'var(--secondary-font-color-light-mode)' }}>No friends available</p>
          ) : (
            friends.map((friend) => (
              <label key={friend.id} className="search-result-item" style={{ gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(friend.id)}
                  onChange={() => toggleSelection(friend.id)}
                />
                <div className="search-result-info">
                  <div className="search-result-name">
                    {friend.firstName && friend.lastName
                      ? `${friend.firstName} ${friend.lastName}`
                      : friend.username}
                  </div>
                  <div className="search-result-username">@{friend.username}</div>
                </div>
              </label>
            ))
          )}
        </div>
      </div>

      {error && (
        <p style={{ color: 'var(--negative-background-color)', marginBottom: '0.5rem' }}>{error}</p>
      )}

      <button
        className="logout-btn"
        onClick={handleCreate}
        disabled={saving}
        style={{ background: 'var(--system-accent-color)' }}
      >
        {saving ? 'Creating…' : 'Create Group'}
      </button>
    </div>
  );
}

function PopUp() {
  const { popUp, closePopUp } = usePopUpHook();

  if (!popUp.isOpen) return null;

  const renderPopUpContent = () => {
    switch (popUp.type) {
      case 'settings':
        return <SettingsPopUp />;
      case 'search':
        return <SearchPopUp />;
      case 'socialRadar':
        return <SocialRadarPopUp />;
      case 'createGroup':
        return <CreateGroupPopUp />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (popUp.type) {
      case 'settings':
        return 'Settings';
      case 'search':
        return 'Find Friends';
      case 'socialRadar':
        return 'Social Radar';
      case 'createGroup':
        return 'New Group';
      default:
        return '';
    }
  };

  return (
    <div className="popup-overlay" onClick={closePopUp}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h2>{getTitle()}</h2>
          <button className="close-btn" onClick={closePopUp}>
            ✕
          </button>
        </div>
        {renderPopUpContent()}
      </div>
    </div>
  );
}

export default PopUp;
