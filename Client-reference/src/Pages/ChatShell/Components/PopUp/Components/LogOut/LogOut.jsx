import './LogOut.css';


function LogOut() {
        return (
                <div className="log-out" onClick={(event) => {event.stopPropagation()}} >
                        <p className="title">
                                Log Out
                        </p>

                        <p className="notify">
                                Do you really want to log out?
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
        );
}

export default LogOut;