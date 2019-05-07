import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const Session = (props) => {
  const { location, homies, date } = props.session;
  return (
    <ul className="Session" >
      <li>{moment(date).startOf('day').fromNow()}</li>
      {
        location && <li className="location">{ location }</li>
      }
      {
        homies && <li className="homies">{ homies }</li>
      }
    </ul>
  )
}

export default Session;
