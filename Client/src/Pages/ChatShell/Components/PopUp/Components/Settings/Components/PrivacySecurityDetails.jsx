import '../Styles/PrivacySecurityDetails.css';


function Detail({ detail }) {
        return (
                        <div className="theme-mode privacy-security-detail">
                                <p className="label">
                                        { detail.label }
                                </p>

                                <div className="select">
                                        { detail.value }
                                </div>
                        </div>
        );
}

function PrivacySecurityDetails() {
        const details = [
                {
                        label: "Email",
                        value: "Everybody"
                },
                {
                        label: "Bio",
                        value: "Everybody"
                },
                {
                        label: "Profile photos",
                        value: "Everybody"
                },
                {
                        label: "Forwarded Messages",
                        value: "Everybody"
                },
                {
                        label: "Last seen & Online",
                        value: "Everybody"
                }
        ];

        return (
                <div className="privacy-security-details">
                        <div className="title-tools">
                                <p className="title">
                                        Privacy & Security
                                </p>
                        </div>

                        {details.map((detail, index) => (
                                <Detail key={index} detail={detail} />
                        )) }
                </div>
        );
}

export default PrivacySecurityDetails;