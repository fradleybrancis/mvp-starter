/* eslint-disable import/no-unresolved */
import React from 'react';
import axios from 'axios';
import Log from './Log.jsx';
import AllSessions from './AllSessions.jsx';
import SimpleMap from './SimpleMap.jsx';
import Modal from './Modal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
      totalSessions: 0,
      lat: 0,
      lng: 0,
      allCoordinates: [],
      showAllSpots: false,
      displayForm: false,
      displayedFooty: '',
      note: '',
    };
    this.displayLogs = this.displayLogs.bind(this);
    this.hideLogs = this.hideLogs.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.toggleVisitedSpots = this.toggleVisitedSpots.bind(this);
    this.updateFooty = this.updateFooty.bind(this);
  }

  componentDidMount() {
    axios.get('/logs')
      .then((response) => {
        this.setState({
          totalSessions: response.data.length,
          sessions: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateLocation(lat, lng) {
    this.setState({ lat, lng });
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

  updateFooty(url, note) {
    if (!arguments.length) {
      this.setState({ displayedFooty: '', note: '' });
      return;
    }
    if (url.split(':')[0] !== 'https' && !note) {
      return;
    }
    this.setState({ displayedFooty: url, note });
  }

  toggleVisitedSpots() {
    const { showAllSpots } = this.state;
    if (!showAllSpots) {
      axios.get('/allCoordinates')
        .then(response => this.setState({
          allCoordinates: response.data,
          showAllSpots: !showAllSpots,
        }))
        .catch(error => console.warn(error));
    } else {
      this.setState({
        allCoordinates: [],
        showAllSpots: !showAllSpots,
      });
    }
  }

  hideLogs() {
    this.setState({ sessions: [] });
  }

  render() {
    const {
      totalSessions, sessions, lat, lng, allCoordinates, showAllSpots, displayedFooty, note, displayForm,
    } = this.state;
    return (
      <React.Fragment>
        <h1 className="header">Skate Log</h1>
        <div className="counter">
          { totalSessions }
          {' '}
          Sessions Logged
          <div className="container">
            <button type="button" className="sessionButton" onClick={() => this.setState({ displayForm: !displayForm })}>{displayForm ? "Show Logs" : "Add Log"}</button>
            <button type="button" className="sessionButton" onClick={this.toggleVisitedSpots}> Show / Hide Spots </button>
          </div>
        </div>
        {
          displayedFooty && <Modal displayedFooty={displayedFooty} note={note} updateFooty={this.updateFooty} />
        }
        <div className="mainDisplay">
          {
            !displayForm && (
            <AllSessions
              toggleVisitedSpots={this.toggleVisitedSpots}
              showAllSpots={showAllSpots}
              displayLogs={this.displayLogs}
              updateFooty={this.updateFooty}
              hideLogs={this.hideLogs}
              sessions={sessions}
              deleteLog={this.deleteLog}
              updateLocation={this.updateLocation}
              displayedFooty={displayedFooty}
              note={note}
            />
            )
          }
          {
            displayForm && <Log id="left" handleLog={this.handleLog} lat={lat} lng={lng} updateFooty={this.updateFooty} />
          }
          <SimpleMap allSpots={allCoordinates} updateLocation={this.updateLocation} lat={lat} lng={lng} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
