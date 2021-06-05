import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      something: null,
    };
  }

  render() {
    return (
      <div>
        My React App
      </div>
    );
  }
}

export default App;
