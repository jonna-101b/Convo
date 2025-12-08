import UseSelectHook from "../../../../../Hooks/UseSelectHook";
import { format, isSameDay } from "date-fns";
import SeenIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/seen.png';
import SentIcon from '../../../../../../../assets/Icons/ChatShell/ChatWindow/sent.png';
import '../Styles/ChatArea.css';


function Chat({ chat, end }) {
        const myChat = chat.owner == "you" ? true : false;
        const seenIcon = myChat ? (chat.seen ? SeenIcon : SentIcon ) : "";

        return (
                <div className={`chat ${chat.owner} ${end ? "end" : null}`}>
                        { myChat ? null: 
                                <p className="profile-picture">
                                        <img src="www.fdsalhljdsha.com" />
                                </p>
                        }

                        <div className="message-time">
                                <div className="message">
                                        { chat.message }
                                </div>

                                <p className="time-seen">
                                        <span className="seen-status">
                                                <img src={seenIcon} />
                                        </span>

                                        <span className="time">
                                                { chat.time }
                                        </span>
                                </p>
                        </div>
                </div>
        );
}

const isEmpty = (obj) => {
        return Object.entries(obj).length === 0;
};

function organizeChats(chats) {
        let chatsArray = [];
        let prevDate = Date.now();
        let currDate = chats.length ? new Date(chats[0].date) : Date.now();
        let counter = 0;

        for (let chat of chats) {
                counter += 1;
                if (!isSameDay(prevDate, currDate)) {
                        let date = 
                                <p className="date" >
                                        {format(currDate, "MMMM dd, yyyy")}
                                </p>;

                        prevDate = currDate;
                        chatsArray.push(date);
                }

                chatsArray.push(<Chat key={chat._id} chat={chat} end={ counter < chats.length ? (chat.owner !== chats[counter ].owner ? true : false) : true } />);
                currDate = new Date(chat.date);
        }
        return chatsArray;
}

function ChatArea() {
        const { selected } = UseSelectHook();

        return (
                <div className="chat-area">
                        <div className="wrapper">
                                { isEmpty(selected) ? null :
                                        organizeChats(selected.chatHistory)
                                }
                        </div>
                </div>
        );
}

export default ChatArea;