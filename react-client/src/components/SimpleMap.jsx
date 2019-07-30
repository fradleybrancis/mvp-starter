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
    if (prevProps.lat !== this.props.lat) {
      this.setState({ lat: this.props.lat, lng: this.props.lng });
    }
    if (prevState.lat !== lat) {
      updateLocation(lat, lng);
    }
  }

  render() {
    const { lat, lng } = this.state;
    const { center, zoom, allSpots } = this.props;
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
          {
            allSpots.length && allSpots.map(session => (
              <Pin lat={session.location.split(',')[0]} lng={session.location.split(',')[1]} />
            ))
          }
          <Pin lat={lat} lng={lng} />
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
  allSpots: [],
};

SimpleMap.propTypes = {
  updateLocation: PropTypes.func.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  zoom: PropTypes.number,
  allSpots: PropTypes.arrayOf(PropTypes.object),
};

export default SimpleMap;
