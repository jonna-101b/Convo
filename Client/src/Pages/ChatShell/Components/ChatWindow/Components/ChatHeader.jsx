import SearchLightIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/search-light.png';
import SearchDarkIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/search-dark.png';
import MenuLightIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/menu-light.png';
import MenuDarkIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/menu-dark.png';
import '../Styles/ChatHeader.css';


function ChatHeader() {
        return (
                <div className="chat-header">
                        <div className="mini-profile">
                                <p className="image">
                                        <img src="www.siusclhscjcks.com" />
                                </p>

                                <div className="details">
                                        <p className="username">
                                                Jonna
                                        </p>

                                        <p className="status">
                                                Online
                                        </p>
                                </div>
                        </div>

                        <div className="tools">
                                <p className="search">
                                        <img src={SearchLightIcon} alt="Search icon" />
                                </p>

                                <p className="menu">
                                        <img src={MenuLightIcon} alt="Menu icon" />
                                </p>
                        </div>
                </div>
        );
}

export default ChatHeader;