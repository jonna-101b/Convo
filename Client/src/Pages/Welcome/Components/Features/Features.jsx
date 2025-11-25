import MacIcon from '../../../../assets/Images/Welcome/Mac-iphone.png';
import PaperPlaneIcon from  '../../../../assets/Icons/Welcome/paper-plane.png';
import ChatIcon from  '../../../../assets/Icons/Welcome/chat.png';
import FileShareIcon from  '../../../../assets/Icons/Welcome/file-sharing.png';
import MicIcon from  '../../../../assets/Icons/Welcome/mic.png';
import './Features.css';


const Feature = ({ feature }) => (
        <div className="feature">
                <p className="icon">
                        <img src={feature.icon} alt="Feature icon" />
                </p>

                <div className="text">
                        <p className="title">
                                { feature.title }
                        </p>

                        <p className="description">
                                { feature.description }
                        </p>
                </div>
        </div>
);

function Features() {
        const features = [
                {
                        icon: PaperPlaneIcon,
                        title: "Fast Messaging",
                        description: "Send and receive messages instantly, no matter where you are. Chatify is optimized for speed, ensuring your conversations flow without delay or lag."
                },
                {
                        icon: ChatIcon,
                        title: "Group Chatting",
                        description: "Create secure group chats for friends, family, or colleagues. Enjoy seamless conversations with dedicated tools to manage your members and media.",
                },
                {
                        icon: FileShareIcon,
                        title: "File Sharing",
                        description: "Easily share documents, photos, and videos up to [Specify Size/Type] directly within any chat. No more emailing or switching apps to send files."
                },
                {
                        icon: MicIcon,
                        title: "Voice Messaging",
                        description: "When typing isn't enough, just speak! Record and send high-quality voice messages with a single tap, making communication quick and personal."
                }
        ];

        return (
                <div className="features">
                        <div className="descriptions">
                                { features.map((feature, index) => (
                                        <Feature key={index} feature={feature} />
                                )) }
                        </div>

                        <div className="image-headlines">
                                <p className="image">
                                        <img src={MacIcon} alt="Team picture" />
                                </p>

                                <div className="headlines">
                                        <p className="main">
                                                What are you waiting for?
                                        </p>

                                        <p className="sub">
                                                Start connecting with your friends right now.
                                        </p>
                                </div>
                        </div>
                </div>
        );
}

export default Features;