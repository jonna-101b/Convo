import UseSelectHook from '../../../Hooks/UseSelectHook';
import useInfoDisplayHook from '../../../Hooks/UseInfoDisplayHook';
import SearchLightIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/search-light.png';
import SearchDarkIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/search-dark.png';
import MenuLightIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/menu-light.png';
import MenuDarkIcon from '../../../../../assets/Icons/ChatShell/ChatWindow/menu-dark.png';
import '../Styles/ChatHeader.css';


const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function ChatHeader() {
        const { selected } = UseSelectHook();
        const { setDisplay } = useInfoDisplayHook();
        const username = isEmpty(selected) ? null : selected.username;
        const status = "Online";

        const handleInfoDisplay = () => {
                setDisplay(true);
        };

        return (
                <div className="chat-header" onClick={handleInfoDisplay}>
                        <div className="mini-profile">
                                <p className="image">
                                        <img src="www.siusclhscjcks.com" />
                                </p>

                                <div className="details">
                                        <p className="username">
                                                { username }
                                        </p>

                                        <p className="status">
                                                { status }
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