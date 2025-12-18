import { ProfileContextProvider } from "../../Contexts/ProfileContext";
import { FriendsContextProvider } from "../../Contexts/FriendsContext";
import { GroupsContextProvider } from "../../Contexts/GroupsContext";
import { SelectedChatContextProvider } from "./Contexts/SelectedChatContext";
import { PopUpContextProvider } from "./Contexts/PopUpContext";
import { InfoDisplayContextProvider } from "./Contexts/InfoDisplayContext";
import { SelectedFileContextProvider } from "./Contexts/SelectedFileContext";
import { SelectedTabStatusContextProvider } from "./Contexts/SelectedTabStatusContext";
import SidePanel from "./Components/SidePanel/SidePanel";
import ChatWindow from "./Components/ChatWindow/ChatWindow";
import InfoPanel from "./Components/InfoPanel/InfoPanel";
import PopUp from "./Components/PopUp/PopUp";
import './ChatShell.css';
import { EmojiDisplayContextProvider } from "./Contexts/EmojiDisplayContext";


function ChatShell() {
        return (
                <ProfileContextProvider>
                        <FriendsContextProvider>
                                <GroupsContextProvider>
                                        <SelectedChatContextProvider>
                                                <PopUpContextProvider>
                                                        <InfoDisplayContextProvider>
                                                                <SelectedFileContextProvider>
                                                                        <SelectedTabStatusContextProvider>
                                                                                <EmojiDisplayContextProvider>
                                                                                        <div className="chat-shell">
                                                                                                <SidePanel />

                                                                                                <ChatWindow />

                                                                                                <InfoPanel />

                                                                                                <PopUp />
                                                                                        </div>
                                                                                </EmojiDisplayContextProvider>
                                                                        </SelectedTabStatusContextProvider>
                                                                </SelectedFileContextProvider>
                                                        </InfoDisplayContextProvider>
                                                </PopUpContextProvider>
                                        </SelectedChatContextProvider>
                                </GroupsContextProvider>
                        </FriendsContextProvider>
                </ProfileContextProvider>
        );
}

export default ChatShell;