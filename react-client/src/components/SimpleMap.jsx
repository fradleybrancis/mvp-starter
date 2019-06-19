import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
import key from '../../../hideThis.js';

const Pin = props => (
  <FontAwesomeIcon icon={faStreetView} />
);

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { lng, lat } = this.state;
    const { updateLocation } = this.props;
    if (prevState.lat !== lat) {
      updateLocation(lat, lng);
    }
  }

  render() {
    const { lat, lng } = this.state;
    const { updateLocation, center, zoom } = this.props;
    return (
      <div style={{ height: '390px', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={center}
          defaultZoom={zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
          onClick={e => this.setState({ lat: e.lat, lng: e.lng })}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        >
          <Pin
            lat={lat}
            lng={lng}
            updateLocation={updateLocation}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

SimpleMap.defaultProps = {
  center: {
    lat: 37.770055,
    lng: -122.421524,
  },
  zoom: 11,
};

SimpleMap.propTypes = {
  updateLocation: PropTypes.func.isRequired,
  center: {
    lat: PropTypes.number,
    lng: PropTypes.number,
  },
  zoom: PropTypes.number,
};

export default SimpleMap;
