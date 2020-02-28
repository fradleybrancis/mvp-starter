import React from 'react';
import propTypes from 'prop-types';
import Session from './Session.jsx';
import { connect } from 'react-redux';

const AllSessions = (props) => {
  const {
    displayLogs, sessions, hideLogs, updateLocation, toggleVisitedSpots, updateFooty, displayedFooty, note, centerAndZoom,
  } = props;
  return (
    <div className="AllSessions">
      {
          sessions && sessions.map((session, index) => (
            <Session
              date={session.date}
              location={session.location}
              footy={session.footy}
              notes={session.notes}
              fileName={session.fileName}
              id={session._id}
              key={index}
              updateFooty={updateFooty}
              updateLocation={updateLocation}
              centerAndZoom={centerAndZoom}
            />
          ))
        }
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

// export default AllSessions;

const mapStateToProps = (state) => {
  const { sessions } = state;
  return { sessions };
};

export default connect(mapStateToProps)(AllSessions);
