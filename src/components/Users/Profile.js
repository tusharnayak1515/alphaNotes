import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import userContext from '../../context/users/userContext';

import styles from './profile.module.css';

const Profile = () => {
    let history = useHistory();
    const context = useContext(userContext);
    const { getUserDetails, userDetails } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUserDetails();
        }
        else {
            history.push("/login");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div id={styles.container}>
            <h1>Profile</h1>
            <div id={styles.profile}>
                <div className={`card ${styles.mycard}`}>
                    <div className={`card-body ${styles.mybody}`}>
                        <h3 className="card-title">Name:</h3>
                        <div className={styles.details}>
                            <p className="card-text">{userDetails.name}</p>
                        </div>
                    </div>
                </div>

                <div className={`card ${styles.mycard}`}>
                    <div className={`card-body ${styles.mybody}`}>
                        <h3 className="card-title">Email:</h3>
                        <div className={styles.details}>
                            <p className="card-text">{userDetails.email}</p>
                        </div>
                    </div>
                </div>
                {/* <div className={styles.item}>
                    <h3>Name: </h3>
                    <h4>{userDetails.name}</h4>
                </div>

                <div className={styles.item}>
                    <h3>Email: </h3>
                    <h4>{userDetails.email}</h4>
                </div> */}
            </div>
        </div>
    )
}

export default Profile
