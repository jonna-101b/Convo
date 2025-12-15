import usePopUpHook from '../../Hooks/UsePopUpHook';
import LogOut from './Components/LogOut/LogOut';
import SocialRadar from './Components/SocialRadar/SocialRadar';
import Settings from './Components/Settings/Settings';
import SearchPanel from './Components/Search/SearchPanel';
import EntitiesStatus from './Components/EntitiesStatus/EntitiesStatus';
import FilesShared from './Components/FilesShared/FilesShared';
import './PopUp.css';


function PopUp() {
        const { label, setLabel } = usePopUpHook();
        const popComponents = { 
                "log out": <LogOut />, 
                "social radar": <SocialRadar />, 
                "search panel": <SearchPanel />, 
                "settings": <Settings />,
                "entities status": <EntitiesStatus />,
                "files shared": <FilesShared />
        };

        const handleClose = () => {
                setLabel("");
        };

        return (
                <div className={`pop-up ${label ? "active" : null}`} onClick={handleClose} >
                        {label ? popComponents[label] : null}
                </div>
        );
}

export default PopUp;