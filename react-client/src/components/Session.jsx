import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Session = ({ session }) => {
  const {
    location, homies, date, kickflip, deleteLog,
  } = session;
  const grammar = str => str.slice(0, 1).toUpperCase().concat(str.slice(1));
  return (
    <div className="Session">
      <div>
        <span className="location">{ grammar(moment(date).startOf('day').fromNow()) }</span>
        {
          location && <span className="location">{ ` at ${location}` }</span>
        }
      </div>
      {
        homies && <div className="homies">{ homies }</div>
      }
      <span>
        kickflip:
        {
          kickflip && <span className="homies"> &#10004; </span>
        }
        {
          !kickflip && <span className="homies"> &#10008; </span>
        }
      </span>
      <div>
        <button type="button" className="delete" onClick={() => deleteLog(date)}><FontAwesomeIcon icon={faTrash} /></button>
      </div>
    </div>
  );
};

Session.propTypes = {
  session: PropTypes.shape.isRequired,
};

export default Session;
