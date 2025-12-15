import '../Styles/LogOut.css';


function LogOut() {
    return (
            <div className="log-out">
                        <div className="title-tools">
                                <p className="title">
                                        Log out
                                </p>
                        </div>
                    
                        <div className="notice">
                                <p className="message">
                                        Are you sure you want to log out?
                                </p>
                                
                                <div className="actions">
                                        <p className="yes">
                                                Yeah, sure
                                        </p>

                                        <p className="no">
                                                No, cancel
                                        </p>
                                </div>
                        </div>
            </div>
        );
}

export default LogOut;