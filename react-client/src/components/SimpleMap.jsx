import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import key from '../../../hideThis.js';
 
const AnyReactComponent = ({ text }) => <div>{ text }</div>;
 
class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {
    return (
      <div style={{ height: '390px', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
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
  zoom: 11
}
 
export default SimpleMap;