import { useEffect, useRef, useState } from 'react';
import UseSelectHook from '../../../../Hooks/UseSelectHook';
import './FilesShared.css';
import useSelectedFileHook from '../../../../Hooks/useSelectedFileHook';


function File({ picture, name, extraInfo, action }) {
        return (
                <div className="file">
                        <p className="picture">
                                <img src="www.dsyfsdhjlfashj.com" />
                        </p>

                        <div className="details">
                                <div className="info">
                                        <p className="name">
                                                {name}
                                        </p>

                                        <p className="extra-info">
                                                {extraInfo}
                                        </p>
                                </div>

                                <p className={`action ${action ? null : "empty"}`}>
                                        {action}
                                </p>
                        </div>
                </div>
        );
}

function FileLabel({ label, activeTab, handleTabClick }) {
        return (
                <div 
                        className={`${label.name.toLowerCase()} file-labels ${activeTab.name === label.name.toLowerCase() ? "active" : null}`} 
                        onClick={() => {handleTabClick(label)}} 
                >
                        <p className="value">
                                { label.value }
                        </p>

                        <p className="label">
                                { label.name }
                        </p>
                </div>
        );
}

const extractFileLabels = (files) => {
        let newFiles = [];
        let counter = 0;

        Object.keys(files).forEach((file) => {
                if (files[file]) {
                        newFiles.push({
                                _id: counter,
                                name: `${file}`,
                                value: files[file]
                        });
                        counter += 1;
                }
        });

        return newFiles;
};

const findFile = (files, selected) => {
        for (let file of files) {
                if (file.name === selected) {
                        return file;
                }
        }

        return null;
};

function FilesShared() {
        const { selected } = UseSelectHook();
        const { selectedFile } = useSelectedFileHook();
        const status = "online";
        const [activeTab, setActiveTab] = useState({});
        const tabIndicatorRef = useRef(null);
        const fileLabels = extractFileLabels(selected.filesShared);
        // const files = { "mutual": friends, "friends": friends, "groups": groups };

        useEffect(() => {
                setActiveTab(findFile(fileLabels, selectedFile));
        }, [selectedFile]);

        const countUnread = (chats) => {
                let counter = 0;
                for (let chat of chats) {
                        if ( chat.owner != "you" && !chat.seen ) {
                                counter += 1;
                        }
                }

                return counter;
        };

        const handleTabClick = (tab) => {
                setActiveTab(tab);
        };

        useEffect(() => {
                const tabIndicator = tabIndicatorRef.current;
                
                if (tabIndicator) {
                        const stepSize = activeTab._id * tabIndicator.offsetWidth;
                        const gapSize = activeTab._id;
                        tabIndicator.style.transform = `translateX(calc(${stepSize}px + ${gapSize}vh))`;
                }
        }, [activeTab]);

        return (
                <div className="files-shared" onClick={(event) => { event.stopPropagation() }} >
                        <div className="mini-profile">
                                <p className="image">
                                        <img src="www.siusclhscjcks.com" />
                                </p>

                                <div className="details">
                                        <p className="username">
                                                {selected.username}
                                        </p>

                                        <p className="status">
                                                {status}
                                        </p>
                                </div>
                        </div>

                        <div className="status-bar">
                                { fileLabels.map((label) => (
                                        <FileLabel key={label._id} label={label} activeTab={activeTab} handleTabClick={handleTabClick} />
                                )) }

                                <p className="active-tab-indicator" ref={tabIndicatorRef} ></p>
                        </div>

                        {/* <div className="list">
                                {files[activeTab.name].map((file) => (
                                        <File
                                                key={file._id}
                                                name={file.username ? file.username : file.groupName}
                                                extraInfo={file.email ? file.email : file.members}
                                                action={countUnread(file.chatHistory)}
                                        />
                                ))}
                        </div> */}
                </div>
        );
}

export default FilesShared;