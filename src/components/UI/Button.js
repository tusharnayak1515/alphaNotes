import React from 'react';

import styles from './button.module.css';

const Button = (props) => {
    return (
        <button id={styles.btn}>{props.children}</button>
    )
}

export default Button;
