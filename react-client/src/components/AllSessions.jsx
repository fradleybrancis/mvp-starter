import React from "react";
import Session from "./Session.jsx";

const AllSessions = (props) => {
  const { displayLogs, sessions } = props
  return (
    <div className="container">
      <button type="button" onClick={ displayLogs }> Show All Sessions </button>
      {
        sessions && sessions.map((session, index) => {
          return <Session session={ session } key={ index }/>
        })
      }
    </div>
  )
}

export default AllSessions;