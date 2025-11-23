import HomeMainImage from '../../../../assets/Images/Welcome/home-main.png';
import './Home.css';


function Home() {
        return (
                <div className="home">
                        <div className="headlines">
                                <p className="main">
                                        Ready to make some friends?
                                </p>

                                <p className="sub">
                                        Fast, friendly and built for the way  you talk.
                                </p>
                        </div>

                        <div className="image">
                                <img src={HomeMainImage} alt="Home main image" />
                        </div>
                </div>
        );
}

export default Home;