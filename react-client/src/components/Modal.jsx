import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // creates function to exit modal on any key press
    const { updateFooty } = this.props;
    window.addEventListener('keyup', () => updateFooty(), false);
  }

  componentWillUnmount() {
    // removes function when modal is closed to prevent duplication
    const { updateFooty } = this.props;
    window.removeEventListener('keyup', () => updateFooty(), false);
  }

  render() {
    const { displayedFooty, note } = this.props;
    return (
      <div className="modal">
        <div className="modal-main">
          <img src={displayedFooty} alt="" />
          <p>{note}</p>
        </div>
      </div>
    );
  }
}
