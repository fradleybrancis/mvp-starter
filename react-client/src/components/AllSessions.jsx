import React from "react";
import Session from "./Session.jsx";

const AllSessions = (props) => {
  const { displayLogs, sessions, deleteLog, hideLogs } = props
  return (
    <div className="container">
      <span>
        <button type="button" className="sessionButton" onClick={ displayLogs }> Show All Sessions </button>
      </span>
      <span>
        <button type="button" className="sessionButton" onClick={ hideLogs } >Hide All Sessions</button>
      </span>
      {
        sessions && sessions.map((session, index) => {
          return <Session session={ session } key={ index } deleteLog={ deleteLog }/>
        })
      }
    </div>
  )
}

export default AllSessions;