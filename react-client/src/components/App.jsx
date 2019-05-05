import React from 'react';
import $ from 'jquery';
import Log from './Log.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
     
    }
  }

  render () {
    return (<div>
      <h1>Skate Log</h1>
      <Log />
    </div>)
  }
}

export default App;