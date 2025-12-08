import useInfoDisplayHook from '../../../Hooks/UseInfoDisplayHook';
import MenuLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/menu-light.png';
import MenuDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/menu-dark.png';
import SideBarLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/sidebar-light.png';
import SideBarDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/sidebar-dark.png';
import '../Styles/InfoHeader.css';


function InfoHeader() {
        const { setDisplay } = useInfoDisplayHook();

        const handleInfoDisplay = () => {
                setDisplay(false);
        };

        return (
                <div className="info-header">
                        <p className="title">
                                User Info
                        </p>

                        <div className="tools">
                                <p className="side-bar" onClick={handleInfoDisplay}>
                                        <img src={SideBarLightIcon} alt="Menu light icon" />
                                </p>

                                <p className="acitivity">
                                        <img src={MenuLightIcon} alt="Menu light icon" />
                                </p>
                        </div>
                </div>
        );
}

export default InfoHeader;