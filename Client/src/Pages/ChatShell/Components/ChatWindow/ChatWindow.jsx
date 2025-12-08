import UseSelectHook from '../../Hooks/UseSelectHook';
import ChatHeader from './Components/ChatHeader';
import ChatBody from './Components/ChatBody/ChatBody';
import './ChatWindow.css';


const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function  ChatWindow() {
        const { selected } = UseSelectHook();

        return (
                <div className="chat-window" >
                        { isEmpty(selected) ?
                                null
                                :
                                <>
                                        <ChatHeader />
                                        
                                        <ChatBody />
                                </>
                        }
                </div>
        );
}

export default ChatWindow;