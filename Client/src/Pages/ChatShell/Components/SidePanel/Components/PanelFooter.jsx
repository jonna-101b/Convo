import useProfileHook from '../../../../../hooks/useProfileHook';
import usePopUpHook from '../../../hooks/usePopUpHook';

function PanelFooter() {
  const { profile } = useProfileHook();
  const { openPopUp } = usePopUpHook();

  const getInitials = () => {
    if (profile?.firstName && profile?.lastName) {
      return (profile.firstName[0] + profile.lastName[0]).toUpperCase();
    }
    return profile?.username?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="panel-footer" onClick={() => openPopUp('settings')}>
      <div className="user-profile-pic">
        {getInitials()}
      </div>

      <div className="user-info">
        <p className="user-name">
          {profile?.firstName && profile?.lastName
            ? `${profile.firstName} ${profile.lastName}`
            : profile?.username || 'User'}
        </p>
        <p className="user-status">@{profile?.username || 'username'}</p>
      </div>
    </div>
  );
}

export default PanelFooter;
