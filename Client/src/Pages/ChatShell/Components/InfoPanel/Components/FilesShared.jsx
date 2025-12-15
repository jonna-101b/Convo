import UseSelectHook from '../../../Hooks/UseSelectHook';
import PhotosLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/photos-light.png';
import PhotosDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/photos-dark.png';
import VideoLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/video-light.png';
import VideoDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/video-dark.png';
import AudioLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/note-light.png';
import AudioDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/note-dark.png';
import DocumentLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/document-light.png';
import DocumentDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/document-dark.png';
import LinkLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/link-light.png';
import LinkDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/link-dark.png';
import VoiceLightIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/mic-light.png';
import VoiceDarkIcon from '../../../../../assets/Icons/ChatShell/InfoPanel/mic-dark.png';
import '../Styles/FilesShared.css';
import usePopUpHook from '../../../Hooks/UsePopUpHook';
import useSelectedFileHook from '../../../Hooks/useSelectedFileHook';


const File = ({ fileName, value, handleClick }) => {
        const fileIcon = {
                photos: PhotosLightIcon,
                videos: VideoLightIcon,
                audios: AudioLightIcon,
                documents: DocumentLightIcon,
                links: LinkLightIcon,
                voice: VoiceLightIcon
        };

        return (
                <div className={`file ${value ? null : "empty"}`} onClick={() => {handleClick(fileName)}} >
                        <p className="icon">
                                <img src={ fileIcon[fileName] } />
                        </p>

                        <p className="value">
                                { value }{ ` ${fileName}` }
                        </p>
                </div>
        );
};

const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function FilesShared() {
        const { selected } = UseSelectHook();
        const { setLabel } = usePopUpHook();
        const { setSelectedFile } = useSelectedFileHook();

        const handleClick = (fileName) => {
                setLabel("files shared");
                setSelectedFile(fileName);
        };

        if (isEmpty(selected)) {
                return null;
        }

        return (
                <div className="files-shared">
                        <p className="title">
                                Shared Files
                        </p>

                        { Object.keys(selected.filesShared).map((fileName, index) => (
                                <File key={index} fileName={fileName} value={selected.filesShared[fileName]} handleClick={handleClick} />
                        )) }
                </div>
        );
}

export default FilesShared;