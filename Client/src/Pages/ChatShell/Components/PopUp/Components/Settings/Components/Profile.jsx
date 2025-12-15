import useProfileHook from '../../../../../../../Hooks/useProfileHook';
import useSelectedTabStatusHook from '../../../../../Hooks/useSelectedTabStatusHook';
import AtIcon from '../../../../../../../assets/Icons/ChatShell/PopUp/at.png';
import MailIcon from '../../../../../../../assets/Icons/ChatShell/PopUp/mail.png';
import QuoteIcon from '../../../../../../../assets/Icons/ChatShell/PopUp/quote.png';
import usePopUpHook from '../../../../../Hooks/UsePopUpHook';
import '../Styles/Profile.css';


const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function Profile() {
        const { profile } = useProfileHook();
        const { setLabel } = usePopUpHook();
        const { setSelectedTab } = useSelectedTabStatusHook();

        const handleEntitiesClick = (tabName) => {
                setLabel("entities status");
                setSelectedTab(tabName);
        };

        if (isEmpty(profile)) {
                return null;
        }

        return (
                <div className="profile">
                        <div className="title-tools">
                                <p className="title">
                                        Profile
                                </p>
                        </div>
                        
                        <div className="top">
                                <p className="profile-picture">
                                        <img src="www.dshjdskjdc.com" />
                                </p>

                                <p className="username">
                                        {profile.nickName}
                                </p>

                                <p className="status">
                                        Online
                                </p>

                                <div className="mutual-friends-groups">
                                        <div className="mutual"  onClick={() => {handleEntitiesClick("mutual")}} >
                                                <p className="value">
                                                        {profile.archived}
                                                </p>

                                                <p className="label">
                                                        Mutual
                                                </p>
                                        </div>

                                        <div className="friends" onClick={() => {handleEntitiesClick("friends")}} >
                                                <p className="value">
                                                        {profile.totalFriends}
                                                </p>

                                                <p className="label">
                                                        Friends
                                                </p>
                                        </div>

                                        <div className="groups" onClick={() => {handleEntitiesClick("groups")}} >
                                                <p className="value">
                                                        {profile.groups}
                                                </p>

                                                <p className="label">
                                                        Groups
                                                </p>
                                        </div>
                                </div>
                        </div>

                        <div className="bottom">
                                <div className="username bottom-element">
                                        <p className="icon">
                                                <img src={AtIcon} alt="At icon" />
                                        </p>

                                        <div className="details">
                                                <p className="value">
                                                        {profile.username}
                                                </p>

                                                <p className="label">
                                                        Username
                                                </p>
                                        </div>
                                </div>

                                <div className="email bottom-element">
                                        <p className="icon">
                                                <img src={MailIcon} alt="Mail icon" />
                                        </p>

                                        <div className="details">
                                                <p className="value">
                                                        {profile.email}
                                                </p>

                                                <p className="label">
                                                        Email
                                                </p>
                                        </div>
                                </div>

                                <div className="bio bottom-element">
                                        <p className="icon">
                                                <img src={QuoteIcon} alt="Quotation icon" />
                                        </p>

                                        <div className="details">
                                                <p className="value">
                                                        {profile.bio}
                                                </p>

                                                <p className="label">
                                                        Bio
                                                </p>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
export default Profile;