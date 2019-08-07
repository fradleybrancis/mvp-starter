import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faStreetView, faBoxOpen, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };

    this.deleteLog = this.deleteLog.bind(this);
  }

  deleteLog() {
    const { id } = this.props;
    axios.delete('/logs', { params: { id } })
      .then(() => {
        window.location = window.location.href;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  displayDate() {
    const { date } = this.props;
    const months = 'January February March April May June July August September October November December'.split(' ');
    for (let i = 0; i < months.length; i += 1) {
      if (Number(date.split('-')[1]) === i + 1) {
        return `${months[i]} ${date.split('-')[2].slice(0, 2)}, ${date.split('-')[0]}`;
      }
    }
    return '';
  }

  render() {
    const { display } = this.state;
    const {
      updateLocation, location, footy, notes, updateFooty,
    } = this.props;
    let hasCoordinates = false;
    let lat = 0;
    let lng = 0;
    if (location && !isNaN(location.split(',')[0])) {
      lat = Number(location.split(',')[0]);
      lng = Number(location.split(',')[1]);
      hasCoordinates = true;
    }

    if (display) {
      return (
        <div className="Session">
          <div className="displayDate">{ this.displayDate() }</div>
          <div className="sessionButtons">
            <button type="button" className="expand" onClick={() => this.setState({ display: !display })}><FontAwesomeIcon icon={faBoxOpen} /></button>
            {
             hasCoordinates && <button type="button" className="show" onClick={() => updateLocation(lat, lng)}><FontAwesomeIcon icon={faStreetView} /></button>
            }
            <button type="submit" className="delete" onClick={this.deleteLog}><FontAwesomeIcon icon={faTrash} /></button>
            <button type="button" onClick={() => updateFooty(footy, notes)}><FontAwesomeIcon icon={faExternalLinkAlt} /></button>
          </div>
        </div>
      );
    }
    return (
      <div className="Session">
        <div className="displayDate">{ this.displayDate() }</div>
        <div className="sessionButtons">
          <button type="button" className="expand" onClick={() => this.setState({ display: !display })}><FontAwesomeIcon icon={faBoxOpen} /></button>
        </div>
      </div>
    );
  }
}

Session.propTypes = {
  updateLocation: propTypes.func.isRequired,
  date: propTypes.string.isRequired,
  location: propTypes.string,
};

// Session.defaultProps = {
//   location: null,
// };

export default Session;
