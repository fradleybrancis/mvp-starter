import React from 'react';
import axios from 'axios';
import Log from './Log.jsx';
import AllSessions from "./AllSessions.jsx";
import SimpleMap from "./SimpleMap.jsx";

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
    this.hideLogs = this.hideLogs.bind(this);
  }

  componentDidMount() {
    axios.get("/total")
      .then(response => {
        this.setState({ totalKickflips: response.data.length });
      })
      .catch(error => {
        alert(error);
      })
  }

  displayLogs(e) {
    axios.get("/logs")
    .then(response => {
      this.setState({sessions: response.data})
    })
    .catch(error => {
      alert(error)
    })
  }

  hideLogs() {
    this.setState({ sessions: [] })
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
      alert("something broke! WHAT DID YOU DO!?")
    })
  }

  render () {
    return (
    <React.Fragment>
      <h1 className="header">Skate Log</h1>
      <div className="counter">{ this.state.totalKickflips } Days That You Kickflipped</div>
      <div id="outer">
        <Log id="left" handleLog={ this.handleLog }/>
        <SimpleMap id="right"/>
      </div>
      <AllSessions displayLogs={ this.displayLogs } hideLogs={ this.hideLogs } sessions={ this.state.sessions } deleteLog={ this.deleteLog }/>
    </React.Fragment>
    )
  }
}

export default App;