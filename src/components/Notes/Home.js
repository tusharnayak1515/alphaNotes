import React from "react";
import { Link } from "react-router-dom";

import Button from "../UI/Button";

import styles from "./home.module.css";

const Home = () => {
    return (
        <div id={styles.home}>
            <h1>Welcome to Alpha-Notes</h1>
            <p>Store your notes on the cloud and access it from anywhere,anytime!</p>
            <Button>
                <Link to="/register">Get Started!</Link>
            </Button>
        </div>
    );
};

export default Home;
