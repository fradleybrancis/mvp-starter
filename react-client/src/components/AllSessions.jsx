import React from 'react';
import propTypes from 'prop-types';
import Session from './Session.jsx';

const AllSessions = (props) => {
  const {
    displayLogs, sessions, hideLogs, updateLocation, toggleVisitedSpots, updateFooty, displayedFooty, note,
  } = props;
  return (
    <div>
      <div className="container">
        <button type="button" className="sessionButton" onClick={displayLogs}> Show All Sessions </button>
        <button type="button" className="sessionButton" onClick={hideLogs}>Hide All Sessions</button>
        <button type="button" className="sessionButton" onClick={toggleVisitedSpots}> Show / Hide Spots </button>
      </div>
      <div className="AllSessions">
        <img src={displayedFooty} alt="" />
        <p1>{note}</p1>
        {
          sessions && sessions.map((session, index) => (
            <Session
              date={session.date}
              location={session.location}
              footy={session.footy}
              notes={session.notes}
              id={session._id}
              key={index}
              updateFooty={updateFooty}
              updateLocation={updateLocation}
            />
          ))
        }
      </div>
    </div>
  );
};

AllSessions.propTypes = {
  displayLogs: propTypes.func.isRequired,
  hideLogs: propTypes.func.isRequired,
  updateLocation: propTypes.func.isRequired,
  toggleVisitedSpots: propTypes.func.isRequired,
  sessions: propTypes.arrayOf(propTypes.shape),
};

AllSessions.defaultProps = {
  sessions: [],
};

export default AllSessions;
