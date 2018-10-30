import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photo: []
    }
  }

  componentDidMount() {
    fetch('/api/movies/7/summary')
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        })
      })
  }

  render() {
    return(<div className="test">hello</div>);
  }
}

export default App;
