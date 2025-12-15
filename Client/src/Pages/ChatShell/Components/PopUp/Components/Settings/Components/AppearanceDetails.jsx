import useProfileHook from '../../../../../../../Hooks/useProfileHook';
import '../Styles/AppearanceDetails.css';


function AppearanceDetails() {
        const { profile } = useProfileHook();

        return (
                <div className="appearance-details">
                        <div className="title-tools">
                                <p className="title">
                                        Appearance
                                </p>
                        </div>

                        <div className="theme-mode appearance-detail">
                                <p className="label">
                                        App theme
                                </p>

                                <div className="select">
                                        {profile.themeMode}
                                </div>
                        </div>

                        <div className="theme-accent-color appearance-detail">
                                <p className="label">
                                        Theme accent color
                                </p>

                                <div className="select">
                                        <p className="value color" style={{backgroundColor: profile.accentColor}} ></p>
                                </div>
                        </div>
                </div>
        );
}

export default AppearanceDetails;