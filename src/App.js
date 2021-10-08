import React, { Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NotesState from "./context/notes/NotesState";
import UsersState from "./context/users/UsersState";

import Navbar from "./components/UI/Navbar";
import Home from "./components/Notes/Home";
// import About from "./components/Notes/About";
// import Login from "./components/Users/Login";
// import Notes from "./components/Notes/Notes";
// import Register from "./components/Users/Register";
// import Alert from "./components/UI/Alert";
// import Addnote from "./components/Notes/Addnote";
// import Profile from "./components/Users/Profile";

const About = React.lazy(()=> import('./components/Notes/About'));
const Login = React.lazy(()=> import('./components/Users/Login'));
const Notes = React.lazy(()=> import('./components/Notes/Notes'));
const Register = React.lazy(()=> import('./components/Users/Register'));
const Alert = React.lazy(()=> import('./components/UI/Alert'));
const Addnote = React.lazy(()=> import('./components/Notes/Addnote'));
const Profile = React.lazy(()=> import('./components/Users/Profile'));

import "./App.css";

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, status)=> {
    setAlert({
      msg: message,
      status: status
    });
    setTimeout(()=> {
      setAlert(null);
    },1500)
  }

  return (
    <Fragment>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert} />
      <UsersState>
        <NotesState>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/notes">
              <Notes showAlert={showAlert} />
            </Route>

            <Route exact path="/addNote">
              <Addnote showAlert={showAlert} />
            </Route>

            <Route exact path="/register">
              <Register showAlert={showAlert} />
            </Route>

            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>
            
          </Switch>
        </NotesState>
      </UsersState>
    </Fragment>
  );
}

export default App;
