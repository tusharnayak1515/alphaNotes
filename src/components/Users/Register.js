import React,{useState,useContext} from "react";
import UserContext from '../../context/users/userContext';

import Button from "../UI/Button";

import styles from "./register.module.css";

const Register = ({showAlert}) => {

  const context = useContext(UserContext);
  const {registerUser} = context;

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onRegister = (e) => {
    e.preventDefault();
    registerUser(credentials);
    const error = localStorage.getItem("error");
    if(error !== null) {
      showAlert(error,"Failure");
    }
    else {
      showAlert("Registered Successfully","Success");
    }
  };
  return (
    <div id={styles.register}>
      <h1>Register Now</h1>
      <form onSubmit={onRegister}>
        <input
          type="text"
          placeholder="Enter Your Name"
          id="name"
          name="name"
          autoComplete="off"
          value={credentials.name}
          onChange={onChange}
        />
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
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          id="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
        />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default Register;
