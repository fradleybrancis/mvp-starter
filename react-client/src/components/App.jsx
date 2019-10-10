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
      allSessions: [],
      totalSessions: 0,
      lat: 0,
      lng: 0,
      center: {
        lat: 37.770055,
        lng: -122.421524,
      },
      zoom: 10,
      allCoordinates: [],
      showAllSpots: false,
      displayForm: false,
      displayedFooty: '',
      note: '',
      searchTerm: '',
    };
    this.displayLogs = this.displayLogs.bind(this);
    this.hideLogs = this.hideLogs.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.toggleVisitedSpots = this.toggleVisitedSpots.bind(this);
    this.updateFooty = this.updateFooty.bind(this);
    this.centerAndZoom = this.centerAndZoom.bind(this);
  }

  componentDidMount() {
    this.displayLogs();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm, allSessions } = this.state;

    if (prevState.searchTerm !== searchTerm) {
      let currentList = [];
      // Variable to hold the filtered list before putting into state
      let newList = [];
  
      // If the search bar isn't empty
      if (searchTerm !== "") {
          // Assign the original list to currentList
        currentList = allSessions;
  
          // Use .filter() to determine which items should be displayed
          // based on the search terms
        newList = currentList.filter(item => {
              // change current item to lowercase
        const lc = item.notes.toLowerCase();
              // change search term to lowercase
        const filter = searchTerm.toLowerCase();
              // check to see if the current list item includes the search term
              // If it does, it will be added to newList. Using lowercase eliminates
              // issues with capitalization in search terms and search content
        return lc.includes(filter);
          });
      } else {
          // If the search bar is empty, set newList to original task list
        newList = allSessions;
      }
      // Set the filtered state based on what our rules added to newList
      this.setState({
        sessions: newList
      });
    }

  }

  updateLocation(lat, lng) {
    this.setState({ lat, lng });
  }

  centerAndZoom(lat, lng) {
    const { zoom } = this.state;
    let scope = zoom;
    scope > 11 ? scope = 11 : scope = zoom + 1;
    this.setState({ lat, lng, center: { lat, lng }, zoom: scope });
  }

  displayLogs() {
    axios.get('/logs')
      .then((response) => {
        this.setState({ sessions: response.data, allSessions: response.data });
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
      totalSessions, sessions, lat, lng, allCoordinates, showAllSpots, displayedFooty, note, displayForm, center, zoom,
    } = this.state;
    return (
      <React.Fragment>
        <h1 className="header">Skate Log</h1>
        <div className="counter">
          <div>
            <label>
              Find Sessions
              <input type="text" placeholder="Ex: Brad at SoMa Skatepark" onChange={(e)=> this.setState({ searchTerm: e.target.value })}/>
            </label>
          </div>
          <div className="container">
            <button type="button" className="sessionButton" onClick={() => this.setState({ displayForm: !displayForm })}>{displayForm ? "Show Logs" : "Add Log"}</button>
            <button type="button" className="sessionButton" onClick={this.toggleVisitedSpots}> { showAllSpots ? "Hide Markers" : "Show Markers" } </button>
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
              centerAndZoom={this.centerAndZoom}
              displayedFooty={displayedFooty}
              note={note}
            />
            )
          }
          {
            displayForm && <Log id="left" handleLog={this.handleLog} lat={lat} lng={lng} updateFooty={this.updateFooty} />
          }
          <SimpleMap allSpots={allCoordinates} updateLocation={this.updateLocation} lat={lat} lng={lng} center={center} zoom={zoom} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
