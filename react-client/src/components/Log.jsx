import React from 'react';
import PropTypes from 'prop-types';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      location: '',
      homies: '',
      kickflip: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { lat, lng } = this.props;
    if (prevProps.lat !== lat) {
      this.setState({ location: `${lat}, ${lng}` }, () => {
        this.refs.location.value = `${lat}, ${lng}`;
      });
    }
  }

  handleInputChange(e) {
    const { name } = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { handleLog } = this.props;
    return (
      <form className="column" onSubmit={e => handleLog(e, this.state)}>
        <label htmlFor="when">
          When:
          <input type="date" name="date" onChange={this.handleInputChange} required />
        </label>
        <label htmlFor="where">
          Where:
          <input type="text" name="location" ref="location" onChange={this.handleInputChange} />
        </label>
        <label htmlFor="homies">
          Homies:
          <input type="text" name="homies" onChange={this.handleInputChange} />
        </label>
        <label htmlFor="kickflip">
          Did You Kickflip?
          <input type="checkbox" name="kickflip" onChange={this.handleInputChange} />
        </label>
        <div>
          <button type="submit" id="formButton">Log Session</button>
        </div>
      </form>
    );
  }
}

Log.propTypes = {
  handleLog: PropTypes.func.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Log;
