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
          🎯
        </p>
        <p onClick={() => openPopUp('search')} title="Search">
          🔍
        </p>
        <p onClick={() => openPopUp('settings')} title="Settings">
          ⚙️
        </p>
      </div>
    </div>
  );
}

export default PanelHeader;
