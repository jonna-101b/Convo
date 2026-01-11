import TeamPic from '../../../../assets/Images/Welcome/team-picture.png';
import './About.css';


const Detail = ({ detail }) => (
        <div className="detail">
                <p className="title">
                        { detail.title }
                </p>

                <p className="description">
                        { detail.description }
                </p>

                { detail.points ? detail.points.map((point, index) => (
                        <p key={index} className="point">
                                <span className="sub-title">
                                        { point.subTitle }
                                </span>

                                <span className="sub-description">
                                        { point.subDescription }
                                </span>
                        </p>
                )) : null }
        </div>
);

function About() {
        const details = [
                {
                        title: "Our Mission: Redefining Digital Conversation",
                        description: "We started Convo because we believe communication should be effortless, fast, and completely reliable. Our goal is to be the most friendly and secure way to stay in touch, whether you're across the street or across the globe."
                },
                {
                        title: "Core Values",
                        description: "Our entire platform is built on three unbreakable promises to our users:",
                        points: [
                                {subTitle: "⚡️ Speed & Simplicity: ", subDescription: "We prioritize a seamless experience."},
                                {subTitle: "🔒 Trust & Privacy: ", subDescription: "Your conversations are yours alone."},
                                {subTitle: "🤝 Friendly Connection: ", subDescription: "We believe in communication that brings people closer."}
                        ]
                },
                {
                        title: "The Convo Story",
                        description: "Convo was founded in 2025 G.C. by a small team of developers in Addis Ababa University who were frustrated by the complexity and privacy issues of existing messaging apps. We wanted to build the app *we* wanted to use—one that was fast, fun, and treated users with respect."
                }
        ];

        return (
                <div className="about">
                        <div className="image-headlines">
                                <p className="image">
                                        <img src={TeamPic} alt="Team picture" />
                                </p>

                                <div className="headlines">
                                        <p className="main">
                                                Meet the Team!
                                        </p>

                                        <p className="sub">
                                                A passionate team dedicated to keeping your chats flowing smoothly.
                                        </p>
                                </div>
                        </div>

                        <div className="descriptions">
                                { details.map((detail, index) => (
                                        <Detail key={index} detail={detail} />
                                )) }
                        </div>
                </div>
        );
}

export default About;