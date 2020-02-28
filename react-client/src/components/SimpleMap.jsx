import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';
// import key from '../../../hideThis.js';

const Pin = props => (
  <FontAwesomeIcon icon={faStreetView} />
);

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
  }

  render() {
    const { center, zoom, allSpots, updateLocation, lat, lng } = this.props;
    return (
      <div style={{ height: '450px', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDRGxvLSs6S5I0HiSFhPeQrGmlYFSWqJXU' }}
          center={center}
          zoom={zoom}
          onChildClick={this._onChildClick}
          onClick={e => updateLocation(e.lat, e.lng)}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        >
          {
            allSpots.length && allSpots.map((session, index) => {
              return <Pin lat={session.location.split(',')[0]} lng={session.location.split(',')[1]} key={index} />
            })
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

// const mapStateToProps = (state) => ({
//   center: , zoom, allSpots, updateLocation, lat, lng
// });
