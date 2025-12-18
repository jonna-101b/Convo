import { useRef, useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import useEmojiDisplayHook from '../../../../../Hooks/useEmojiDisplayHook';
import ClipIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/clip.png';
import ClipLightIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/clip-hover-light.png';
import ClipDarkIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/clip-hover-dark.png';
import EmojiIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/emoji.png';
import EmojiLightIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/emoji-hover-light.png';
import EmojiDarkIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/emoji-hover-dark.png';
import MicIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/mic.png';
import MicLightIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/mic-hover-light.png';
import MicDarkIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/mic-hover-dark.png';
import ImageIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/image.png';
import ImageLightIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/image-hover-light.png';
import ImageDarkIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/image-hover-dark.png';
import FileIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/file.png';
import FileLightIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/file-hover-light.png';
import FileDarkIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/file-hover-dark.png';
import SendIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/send.png';
import '../Styles/ChatToolbar.css';


function EmojiSection({ setInput }) {
        return (
                <div className="emoji-section" onClick={(event) => {event.stopPropagation()}} >
                        <EmojiPicker onEmojiClick={(emojiData) => {setInput(prev => prev + emojiData.emoji)}} />
                </div>
        );
}

function ChatToolbar() {
        const [ input, setInput ] = useState("");
        const { display, setDisplay } = useEmojiDisplayHook();
        const textareaRef = useRef(null);

        const handleEmojiDisplay = (event) => {
                event.stopPropagation();
                setDisplay(true);
        };
        
        const handleInput = (message) => {
                setInput(message);

                const textarea = textareaRef.current;
                const MAX_HEIGHT =  105;
                textarea.style.height = 20 + "px";

                if (textarea.scrollHeight <= MAX_HEIGHT) {
                        textarea.style.height = textarea.scrollHeight + "px";
                        textarea.style.overflowY = "hidden";
                } else {
                        textarea.style.height = MAX_HEIGHT + "px";
                        textarea.style.overflowY = "auto";
                }
        };

        return (
                <div className="chat-toolbar">
                        <p className="file click">
                                <img src={ClipIcon} alt="Clip icon" />
                                <img src={ClipLightIcon} alt="Clip icon" className="hover" />
                        </p>
                        
                        <p className="text-area">
                                <textarea 
                                        name="message" 
                                        id="message" 
                                        placeholder="Type something..." 
                                        ref={textareaRef} 
                                        value={input}
                                        onChange={(event) => {handleInput(event.target.value)}}
                                >
                                </textarea>
                        </p>

                        <p className="emoji click" onClick={handleEmojiDisplay} >
                                <img src={EmojiIcon} alt="Emoji icon" />
                                <img src={EmojiLightIcon} alt="Emoji icon" className="hover" />
                        </p>

                        <p className="voice click">
                                <img src={MicIcon} alt="Microphone icon" />
                                <img src={MicLightIcon} alt="Microphone icon" className="hover" />
                        </p>

                        <p className={`send ${ input ? "active" : null }`}>
                                <img src={SendIcon} alt="Send icon" />
                        </p>

                        { display ? <EmojiSection setInput={setInput} /> : null }
                </div>
        );
}

export default ChatToolbar;