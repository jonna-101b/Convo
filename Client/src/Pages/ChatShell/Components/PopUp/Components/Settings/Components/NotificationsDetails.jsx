import '../Styles/NotificationsDetails.css';


function Detail({ detail }) {
        return (
                        <div className="theme-mode notifications-detail">
                                <p className="label">
                                        { detail.label }
                                </p>

                                <div className="select">
                                        { detail.value }
                                </div>
                        </div>
        );
}

function NotificationsDetails() {
        const details = [
                {
                        label: "Private",
                        value: "Everybody"
                },
                {
                        label: "Groups",
                        value: "Everybody"
                },
                {
                        label: "Archived",
                        value: "Everybody"
                }
        ];

        return (
                <div className="notifications-details">
                        <div className="title-tools">
                                <p className="title">
                                        Notifications
                                </p>
                        </div>

                        {details.map((detail, index) => (
                                <Detail key={index} detail={detail} />
                        )) }
                </div>
        );
}

export default NotificationsDetails;