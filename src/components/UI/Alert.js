import React from 'react';

import styles from './alert.module.css';

const Alert = ({alert}) => {

    let success;

    if(alert) {
        if(alert.status === "Success") {
            success = true; 
        }
        else {
            success = false;
        }
    }

    return (
        alert && <div id={styles.alert} style={{backgroundColor: success ? "rgb(51, 221, 51)" : "red"}} >
            <p>{alert.msg}</p>
        </div>
    )
}

export default Alert
