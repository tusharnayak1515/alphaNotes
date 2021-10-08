import { useState } from "react";
import { useHistory } from "react-router";

import UserContext from "./userContext";

const NotesState = (props)=> {
    let history = useHistory();
    const server = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

    const [userDetails, setUserDetails] = useState({name: "", email: ""});

    const registerUser = async ({name,email,password})=> {
        const response = await fetch(`${server}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password})
        });

        const json = await response.json();
        if(json.success) {
            localStorage.setItem("token",json.authToken);
            localStorage.removeItem("error");
            history.push("/notes");
        }
        else {
            localStorage.setItem("error",json.error);
        }
    }

    const loginUser = async ({email,password})=> {
        if(password.trim() === "") {
            return localStorage.setItem("error","Password cannot be blank");
        }
        const response = await fetch(`${server}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        });

        const json = await response.json();
        return json;
        
    }

    const getUserDetails = async ()=> {
        const response = await fetch(`${server}/api/auth/profile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            }
        });

        const profile = await response.json();
        if(profile.success) {
            setUserDetails({name: profile.user.name, email: profile.user.email})
            localStorage.removeItem("error");
        }
        else {
            localStorage.setItem("error",profile.error);
        }
    }
    
    return (
        <UserContext.Provider value={{registerUser, loginUser, getUserDetails, userDetails}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default NotesState;