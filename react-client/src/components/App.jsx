/* eslint-disable import/no-unresolved */
import React from 'react';
import axios from 'axios';
import Log from './Log.jsx';
import AllSessions from './AllSessions.jsx';
import SimpleMap from './SimpleMap.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      totalKickflips: 0,
      lat: 0,
      lng: 0,
    };
    this.handleLog = this.handleLog.bind(this);
    this.displayLogs = this.displayLogs.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
    this.hideLogs = this.hideLogs.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount() {
    axios.get('/total')
      .then((response) => {
        this.setState({ totalKickflips: response.data.length });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateLocation(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }

  displayLogs() {
    axios.get('/logs')
      .then((response) => {
        this.setState({ sessions: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  hideLogs() {
    this.setState({ sessions: [] });
  }

  deleteLog(date) {
    axios.delete('/logs', { params: { date } })
      .then(() => {
        console.log('Log deleted');
        window.location = window.location.href;
      })
      .catch((error) => {
        console.log('Error :', error);
        window.location = window.location.href;
      });
  }

  handleLog(e, state) {
    e.preventDefault();
    axios.post('/logs', state)
      .then(() => {
        if (state.kickflip) {
          console.log('Saved');
          window.location = window.location.href;
        } else {
          console.log('Saved but why no kickflip?');
          window.location = window.location.href;
        }
      })
      .catch((error) => {
        console.log('something broke! WHAT DID YOU DO!?');
      });
  }

  render() {
    const { totalKickflips, sessions, lat, lng } = this.state;
    return (
      <React.Fragment>
        <h1 className="header">Skate Log</h1>
        <div className="counter">
          { totalKickflips }
          {' '}
Days That You Kickflipped
        </div>
        <div id="outer">
          <Log id="left" handleLog={this.handleLog} lat={lat} lng={lng} />
          <SimpleMap id="right" updateLocation={this.updateLocation}/>
        </div>
        <AllSessions displayLogs={this.displayLogs} hideLogs={this.hideLogs} sessions={sessions} deleteLog={this.deleteLog} />
      </React.Fragment>
    );
  }
}

export default App;
