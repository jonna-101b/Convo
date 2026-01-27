import { FaBullseye, FaSearch, FaCog } from 'react-icons/fa';
import usePopUpHook from '../../../hooks/usePopUpHook';

function PanelHeader() {
  const { openPopUp } = usePopUpHook();

  return (
    <div className="panel-header">
      <p className="logo">
        Convo
      </p>

      <div className="tools">
        <p onClick={() => openPopUp('socialRadar')} title="Social Radar">
          <FaBullseye aria-hidden="true" />
        </p>
        <p onClick={() => openPopUp('search')} title="Search">
          <FaSearch aria-hidden="true" />
        </p>
        <p onClick={() => openPopUp('settings')} title="Settings">
          <FaCog aria-hidden="true" />
        </p>
      </div>
    </div>
  );
}

export default PanelHeader;
