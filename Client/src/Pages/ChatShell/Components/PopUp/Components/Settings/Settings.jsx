import { useRef, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile';
import AppearanceDetails from './Components/AppearanceDetails';
import UserLightIcon from '../../../../../../assets/Icons/ChatShell/PopUp/user-light.png';
import UserDarkIcon from '../../../../../../assets/Icons/ChatShell/PopUp/user-dark.png';
import AppearanceLightIcon from '../../../../../../assets/Icons/ChatShell/PopUp/pallete-light.png';
import AppearanceDarkIcon from '../../../../../../assets/Icons/ChatShell/PopUp/pallete-dark.png';
import NotificationsLightIcon from '../../../../../../assets/Icons/ChatShell/PopUp/notification-light.png';
import NotificationsDarkIcon from '../../../../../../assets/Icons/ChatShell/PopUp/notification-dark.png';
import LockLightIcon from '../../../../../../assets/Icons/ChatShell/PopUp/lock-light.png';
import LockDarkIcon from '../../../../../../assets/Icons/ChatShell/PopUp/lock-dark.png';
import LogOutIcon from '../../../../../../assets/Icons/ChatShell/PopUp/logout.png';
import DropLightIcon from '../../../../../../assets/Icons/ChatShell/PopUp/drop-light.png';
import DropDarkIcon from '../../../../../../assets/Icons/ChatShell/PopUp/drop-dark.png';
import './Settings.css';


function Section({ section }) {
        return (
                <NavLink className={({ isActive }) => isActive ? "section active" : "section"} to={section.path} >
                        <div className="icon-name">
                                <p className="icon">
                                        <img src={section.icon} alt={`${section.name} icon`} />
                                </p>

                                <p className="name">
                                        {section.name}
                                </p>
                        </div>
                </NavLink>
        );
}

function Settings() {
        const settingSections = [
                {
                        _id: 0,
                        name: "Profile",
                        path: "profile",
                        icon: UserLightIcon,
                        detail: <Profile />
                },
                {
                        _id: 1,
                        name: "Appearance",
                        path: "appearance",
                        icon: AppearanceLightIcon,
                        detail: <AppearanceDetails />
                },
                {
                        _id: 2,
                        name: "Notifications",
                        path: "notifications",
                        icon: NotificationsLightIcon,
                        detail: <AppearanceDetails />
                },
                {
                        _id: 3,
                        name: "Privacy & Security",
                        path: "privacy-security",
                        icon: LockLightIcon,
                        detail: <AppearanceDetails />
                },
                {
                        _id: 4,
                        name: "Log out",
                        path: "log-out",
                        icon: LogOutIcon,
                        detail: <AppearanceDetails />
                }
        ];

        return (
                <div className="settings" onClick={(event) => {event.stopPropagation()}} >
                        <div className="setting-sections">
                                <p className="title">
                                        Settings
                                </p>

                                { settingSections.map((section) => (
                                        <Section key={section._id} section={section} />
                                )) }
                        </div>

                        <div className="main">
                                <Routes>
                                        <Route index element={<Profile />} />
                                        <Route path='profile' element={<Profile />} />
                                        <Route path='appearance' element={<AppearanceDetails />} />
                                </Routes>
                        </div>
                </div>
        );
}

export default Settings;