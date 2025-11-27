import ConvoLogoLight from '../../../../../assets/Images/ChatShell/SidePanel/Convo-logo-light.png';
import ConvoLogoDark from '../../../../../assets/Images/ChatShell/SidePanel/Convo-logo-dark.png';
import ActivityLightIcon from '../../../../../assets/Icons/ChatShell/SidePanel/activity-light.png';
import ActivityDarkIcon from '../../../../../assets/Icons/ChatShell/SidePanel/activity-dark.png';
import SearchLightIcon from '../../../../../assets/Icons/ChatShell/SidePanel/search-light.png';
import SearchDarkIcon from '../../../../../assets/Icons/ChatShell/SidePanel/search-dark.png';
import SettingsLightIcon from '../../../../../assets/Icons/ChatShell/SidePanel/settings-light.png';
import SettingsDarkIcon from '../../../../../assets/Icons/ChatShell/SidePanel/settings-dark.png';
import '../Styles/PanelHeader.css';

function PanelHeader() {
        return (
                <div className="panel-header">
                        <p className="logo">
                                <img src={ConvoLogoLight} alt="Convo logo light" />
                        </p>

                        <div className="tools">
                                <p className="acitivity">
                                        <img src={ActivityLightIcon} alt="Search light icon" />
                                </p>

                                <p className="search">
                                        <img src={SearchLightIcon} alt="Search light icon" />
                                </p>

                                <p className="settings">
                                        <img src={SettingsLightIcon} alt="Search dark icon" />
                                </p>
                        </div>
                </div>
        );
} 

export default PanelHeader;