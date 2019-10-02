import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // creates function to exit modal on any key press or mouseclick
    const { updateFooty } = this.props;
    window.addEventListener('keyup', () => updateFooty(), false);
    window.addEventListener('mouseup', () => updateFooty(), false);
  }

  componentWillUnmount() {
    // removes function when modal is closed to prevent duplication
    const { updateFooty } = this.props;
    window.removeEventListener('keyup', () => updateFooty(), false);
    window.removeEventListener('mouseup', () => updateFooty(), false);
  }

  render() {
    const { displayedFooty, note } = this.props;
    return (
      <div className="modal">
        <div className="modal-main">
          <img src={displayedFooty} alt="" />
          <div className="bottom-text">{note}</div>
        </div>
      </div>
    );
  }
}
