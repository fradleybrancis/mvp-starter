import React from "react";

class DeleteSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDate: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { deleteDate } = this.state;
    return (
      <div className="container">
        <button type="button" onClick={() => this.props.deleteLog(deleteDate) }>Delete</button>
        <input type="date" name ="deleteDate" onChange={ this.handleChange }></input>
      </div>
    )
  }
}

export default DeleteSession;