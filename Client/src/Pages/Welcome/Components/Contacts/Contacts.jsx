import CallImage from '../../../../assets/Images/Welcome/call.png';
import FacebookIcon from '../../../../assets/Icons/Welcome/facebook.png';
import YoutubeIcon from '../../../../assets/Icons/Welcome/youtube.png';
import InstagramIcon from '../../../../assets/Icons/Welcome/instagram.png';
import TiktokIcon from '../../../../assets/Icons/Welcome/tik-tok.png';
import './Contacts.css';


function Contacts() {
        const links = [ {name: "facebook", icon: FacebookIcon},  {name: "youtube", icon: YoutubeIcon}, {name: "instagram",  icon: InstagramIcon}, {name: "tik tok",  icon: TiktokIcon}];

        return (
                <div className="contacts">
                        <div className="image-headlines">
                                <p className="image">
                                        <img src={CallImage} alt="Team picture" />
                                </p>

                                <div className="headline-link">
                                        <p className="headline">
                                                Let's keep in touch.
                                        </p>

                                        <div className="links">
                                               { links.map((link, index) => (
                                                        <p key={index} >
                                                                <img src={link.icon} alt={link.name} />
                                                        </p>
                                               ))}
                                        </div>
                                </div>
                        </div>

                        <div className="form-links">
                                <form action="">
                                        <p className="punchline">
                                                Do you have something to say? Reach out.
                                        </p>

                                        <p className="name">
                                                <input type="text" name="name" id="name" placeholder="Name" />
                                        </p>

                                        <p className="email">
                                                <input type="email" name="email" id="email" placeholder="Email" />
                                        </p>

                                        <p className="subject">
                                                <input type="text" name="subject" id="subject" placeholder="Subject" />
                                        </p>

                                        <p className="message">
                                                <textarea name="message" id="message" placeholder="Message..."></textarea>
                                        </p>

                                        <button type="submit">Submit</button>
                                </form>

                                <div className="links"></div>
                        </div>
                </div>
        );
}

export default Contacts;