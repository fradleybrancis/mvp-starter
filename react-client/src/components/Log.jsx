import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      location: '',
      file: null,
      notes: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLog = this.handleLog.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { lat, lng } = this.props;
    if (prevProps.lat !== lat) {
      this.setState({ location: `${lat}, ${lng}` }, () => {
        this.refs.location.value = `${lat}, ${lng}`;
      });
    }
  }

  handleLog(e) {
    e.preventDefault();
    const {
      date, location, file, notes,
    } = this.state;
    const { updateFooty } = this.props;
    const formData = new FormData();
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    };
    formData.append('date', date);
    formData.append('location', location);
    formData.append('file', file[0]);
    formData.append('notes', notes);
    axios.post('/logs', formData, config)
      .then((response) => {
        updateFooty(response.data.Location);
      })
      .catch((error) => {
        throw new Error(error);
      })
  }

  handleInputChange(e) {
    const { name } = e.target;
    let value = '';
    if (e.target.files) {
      value = e.target.files;
    } else {
      value = e.target.value;
    }
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form className="column" onSubmit={e => this.handleLog(e)}>
        <label htmlFor="when">
          When:
          <input type="date" name="date" onChange={this.handleInputChange} required />
        </label>
        <label htmlFor="where">
          Where:
          <input type="text" name="location" ref="location" onChange={this.handleInputChange} placeholder="Drop A Pin On The Map"/>
        </label>
        <label htmlFor="notes">
          Notes:
          <input type="text" name="notes" onChange={this.handleInputChange} placeholder="Add A Note To Find The Session Later"/>
        </label>
        <label htmlFor="footy">
          Footy:
          <input type="file" name="file" onChange={this.handleInputChange} />
        </label>
        <div>
          <button type="submit" id="formButton">Log Session</button>
        </div>
      </form>
    );
  }
}

Log.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Log;
