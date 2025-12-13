import UseSelectHook from '../../../Hooks/UseSelectHook';
import MailIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/mail.png';
import QuoteIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/quote.png';
import NotificationsIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/notification.png';
import usePopUpHook from '../../../Hooks/UsePopUpHook';
import '../Styles/InfoBody.css';
import useSelectedTabStatusHook from '../../../Hooks/useSelectedTabStatusHook';


const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function InfoBody() {
        const { selected } = UseSelectHook();
        const { setLabel } = usePopUpHook();
        const { setSelectedTab } = useSelectedTabStatusHook();

        const handleEntitiesClick = (tabName) => {
                setLabel("entities status");
                setSelectedTab(tabName);
        };

        if (isEmpty(selected)) {
                return null;
        }

        return (
                <div className="info-body">
                        <div className="top">
                                <p className="profile-picture">
                                        <img src="www.dshjdskjdc.com" />
                                </p>

                                <p className="username">
                                        {selected.username}
                                </p>

                                <p className="status">
                                        Online
                                </p>

                                <div className="mutual-friends-groups">
                                        <div className="mutual"  onClick={() => {handleEntitiesClick("mutual")}} >
                                                <p className="value">
                                                        {selected.mutualFriends}
                                                </p>

                                                <p className="title">
                                                        Mutual
                                                </p>
                                        </div>

                                        <div className="friends" onClick={() => {handleEntitiesClick("friends")}} >
                                                <p className="value">
                                                        {selected.totalFriends}
                                                </p>

                                                <p className="title">
                                                        Friends
                                                </p>
                                        </div>

                                        <div className="groups" onClick={() => {handleEntitiesClick("groups")}} >
                                                <p className="value">
                                                        {selected.groups}
                                                </p>

                                                <p className="title">
                                                        Groups
                                                </p>
                                        </div>
                                </div>
                        </div>

                        <div className="middle">
                                <div className="email middle-element">
                                        <p className="icon">
                                                <img src={MailIcon} alt="Mail icon" />
                                        </p>

                                        <div className="details">
                                                <p className="value">
                                                        {selected.email}
                                                </p>

                                                <p className="title">
                                                        Email
                                                </p>
                                        </div>
                                </div>

                                <div className="bio middle-element">
                                        <p className="icon">
                                                <img src={QuoteIcon} alt="Quotation icon" />
                                        </p>

                                        <div className="details">
                                                <p className="value">
                                                        {selected.bio}
                                                </p>

                                                <p className="title">
                                                        Bio
                                                </p>
                                        </div>
                                </div>
                        </div>

                        <div className="bottom">
                                <div className="notifications bottom-element ">
                                        <p className="icon">
                                                <img src={NotificationsIcon} alt="Notification icon" />
                                        </p>

                                        <div className="details">
                                                <p className="title">
                                                        Notifications
                                                </p>

                                                <p className={`value ${selected.notifications ? "on" : null}`}>
                                                        <span className="ball"></span>
                                                </p>
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
export default InfoBody;