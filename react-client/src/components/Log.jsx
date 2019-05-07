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
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  render() {
    var { handleLog } = this.props;
    return (
      <form onSubmit={ (e) => handleLog(e, this.state) }>
        <label>
          When:
          <input type="date" name="date" onChange={this.handleInputChange} required></input>
        </label>
        <label>
          Where:
          <input type="text" name="location" onChange={this.handleInputChange}></input>
        </label>
        <label>
          Homies:
          <input type="text" name="homies" onChange={this.handleInputChange}></input>
        </label>
        <label>
          Did You Kickflip?
          <input type="checkbox" name="kickflip" onChange={this.handleInputChange} ></input>
        </label>
        <div>
          <button type="submit" >Log Session</button>
        </div>
      </form>
    )
  }
}

export default Log;