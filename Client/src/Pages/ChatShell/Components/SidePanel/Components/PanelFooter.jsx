import LogOutIcon from '../../../../../assets/Icons/ChatShell/SidePanel/logout.png';
import '../Styles/PanelFooter.css';


function PanelFooter() {
        return (
                <div className="panel-footer">
                        <div className="mini-profile">
                                <p className="image"></p>

                                <div className="details">
                                        <p className="name">
                                                Jonna
                                        </p>

                                        <p className="status">
                                                Online
                                        </p>
                                </div>
                        </div>

                        <div className="tools">
                                <p className="logout">
                                        <img src={LogOutIcon} alt="Log out icon" />
                                </p>
                        </div>
                </div>
        );
}

export default PanelFooter;