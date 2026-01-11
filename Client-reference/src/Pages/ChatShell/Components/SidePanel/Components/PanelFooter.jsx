import LogOutIcon from '../../../../../assets/Icons/ChatShell/SidePanel/logout.png';
import usePopUpHook from '../../../Hooks/UsePopUpHook';
import '../Styles/PanelFooter.css';


function PanelFooter() {
        const { setLabel } = usePopUpHook();

        const handleLogOut = () => {
                setLabel("log out");
        };

        return (
                <div className="panel-footer">
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
                                <p className="logout" onClick={handleLogOut} >
                                        <img src={LogOutIcon} alt="Log out icon" />
                                </p>
                        </div>
                </div>
        );
}

export default PanelFooter;