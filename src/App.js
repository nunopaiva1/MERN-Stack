import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import MessagesList from "./components/messages-list.component";
import EditMessage from "./components/edit-messages.component";
import CreateMessage from "./components/create-message.component";

import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component.js";


import TeamsList from "./components/teams-list.component";
import PlayersList from "./components/players-list.component.js";
import MatchesList from "./components/matches-list.component.js";

function App() {

  return (

    <Router>
    <div className="container">
      <Navbar/>
      <br/>
        <Route path="/" exact component = {MatchesList} />
        <Route path="/edit/:id" exact component = {EditMessage} />
        <Route path="/create" exact component = {CreateMessage} />

        <Route path="/forum" exact component = {MessagesList} />

        <Route path="/registar" exact component = {CreateUser} />
        <Route path="/login" exact component = {LoginUser} />

        <Route path="/team" exact component = {TeamsList} />
        <Route path="/player/:team" exact component = {PlayersList} />
        <Route path="/matches" exact component = {MatchesList} />

    </div>
    </Router>
  );
}
export default App;
