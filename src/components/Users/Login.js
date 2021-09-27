import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/users/userContext";

import Button from "../UI/Button";

import styles from "./login.module.css";

const Login = ({ showAlert }) => {

  // localStorage.setItem("error"," ");

  let history = useHistory();
  if (localStorage.getItem("token")) {
    history.push("/");
  }
  const context = useContext(UserContext);
  const { loginUser } = context;
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const json = await loginUser(credentials);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/notes");
    }
    
    const token = localStorage.getItem("token");
    // console.log(token);
    if(token !== null) {
      showAlert("Login Successful", "Success");
    }
    else {
      showAlert("Invalid Credentials", "Failure");
    }

  }

  return (
    <div id={styles.login}>
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          name="email"
          autoComplete="off"
          value={credentials.email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Enter Your password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          minLength="8"
        />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default Login;
