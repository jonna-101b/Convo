import { useEffect, useRef } from 'react';
import useInfoDisplayHook from '../../Hooks/UseInfoDisplayHook';
import UseSelectHook from '../../Hooks/UseSelectHook';
import InfoHeader from './Components/InfoHeader';
import InfoBody from './Components/InfoBody';
import FilesShared from './Components/FilesShared';
import './InfoPanel.css';


const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function InfoPanel() {
        const { selected } = UseSelectHook();
        const { display } = useInfoDisplayHook();
        const infoDisplayRef = useRef(null);

        useEffect(() => {
                const infoDisplay = infoDisplayRef.current

                if (display) {
                        if (infoDisplay) {
                                infoDisplay.style.width = "25vw";
                        }
                }
                else {
                        if (infoDisplay) {
                                infoDisplay.style.width = "0";
                        }
                }
        }, [display]);


        if (isEmpty(selected)) {
                return null;
        }

        return (
                <div className={`info-panel ${display ? "focused" : null}`} ref={infoDisplayRef} >
                        { display ?
                                <>
                                        <InfoHeader />

                                        <InfoBody />
                
                                        <FilesShared />
                                </>
                                : 
                                null 
                        }
                        
                </div>
        );
}

export default InfoPanel;