import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import styles from './navbar.module.css';

const Navbar = ({showAlert}) => {
    const [isShow, setIsShow] = useState(false);
    let history = useHistory();

    const onLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("error");
        localStorage.removeItem("success");
        history.push("/login");
        showAlert("Logout Successfully","Success");
    }

    let location = useLocation();

    const onToggle = () => {
        const toggle = document.querySelector('ul');
        if (!isShow) {
            toggle.style.display = 'flex';
            setIsShow(true);
        }
        else {
            toggle.style.display = 'none';
            setIsShow(false);
        }
    }

    let isLoggedIn;
    if (localStorage.getItem("token") !== null) {
        isLoggedIn = true;
    }
    else {
        isLoggedIn = false;
    }

    return (
        <nav id={styles.navbar}>

            <div id={styles.logo}>
                <h2>Alpha-Notes</h2>
                <div id={styles.toggle} onClick={onToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <ul>
                <li><Link to='/' className={`${location.pathname === "/" ? styles.active : ""}`}>Home</Link></li>
                <li><Link to='/about' className={`${location.pathname === "/about" ? styles.active : ""}`}>About</Link></li>
                {!isLoggedIn && <>
                    <li><Link to='/login' className={`${location.pathname === "/login" ? styles.active : ""}`}>Login</Link></li>
                    <li><Link to='/register' className={`${location.pathname === "/register" ? styles.active : ""}`}>Register</Link></li>
                </>}

                {isLoggedIn && <>
                    <li><Link to='/notes' className={`${location.pathname === "/notes" ? styles.active : ""}`}>My Notes</Link></li>
                    <li><Link to='/profile' className={`${location.pathname === "/profile" ? styles.active : ""}`}>Profile</Link></li>
                    <li><Link to='' onClick={onLogout}>Logout</Link></li>
                </>}
            </ul>

        </nav>
    )
}

export default Navbar
