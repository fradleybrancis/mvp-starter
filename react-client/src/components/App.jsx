import React from 'react';
import axios from 'axios';
import Log from './Log.jsx';
import AllSessions from "./AllSessions.jsx";
import DeleteSession from "./DeleteSession.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sessions: [],
      totalKickflips: 0,
    }
    this.handleLog = this.handleLog.bind(this);
    this.displayLogs = this.displayLogs.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
  }

  componentDidMount() {
    axios.get("/total")
      .then(response => {
        this.setState({ totalKickflips: response.data.length });
      })
      .catch(error => {
        alert("Something done goofed");
      })
  }

  displayLogs(e) {
    axios.get("/logs")
    .then(response => {
      this.setState({sessions: response.data})
    })
    .catch(error => {
      alert("something broke! WHAT DID YOU DO!?")
    })
  }

  deleteLog(date) {
    axios.delete("/logs", {params: {date: date}})
      .then(() => {
        alert("Log deleted");
        window.location = window.location.href;
      })
      .catch(error => {
        console.log("Error :", error);
        alert("Something happened");
        window.location = window.location.href;
      })
  }

  handleLog(e, state) {
    e.preventDefault()
    axios.post('/logs', state)
    .then(() => {
      if (state.kickflip) {
        alert("Saved");
        window.location = window.location.href;
      } else {
        alert("Saved but why no kickflip?");
        window.location = window.location.href;
      }
    })
    .catch(error => {
      alert("something broke! WHAT DID YOU DO!?");
    })
  }

  render () {
    return (
    <div>
      <img src="https://fontmeme.com/permalink/190507/f2a41e513544ead91d23c28eaa5c0023.png"></img>
      <div className="counter">{ this.state.totalKickflips } Days That You Kickflipped</div>
      <Log handleLog={ this.handleLog }/>
      <DeleteSession deleteLog={ this.deleteLog }/>
      <AllSessions displayLogs={ this.displayLogs } sessions={ this.state.sessions }/>
    </div>
    )
  }
}

export default App;