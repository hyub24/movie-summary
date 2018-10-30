import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: {
        title: 'wedding crashers',
        genre: 'comedy'
      }
    }
  }

  componentDidMount() {
    let id = Math.floor(Math.random() * 100);
    fetch(`/api/movies/${id}/summary`)
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            summary: data
          })
        })
      })
  }

  render() {
    return (
      <div>
        <h3>{this.state.summary.title.toUpperCase()} ({this.state.summary.year})</h3>
        <div><span>🥛</span> {this.state.summary.rating}%</div>
        <div>{this.state.summary.genre.toUpperCase()}</div>
        <h4>Synopsis</h4>
        <div>{this.state.summary.synopsis}</div>
        <div><img src={this.state.summary.trailer}/></div>
        <div>{this.state.summary.photos}</div>
        <div>{this.state.summary.cast}</div>
      </div>
    );
  }
}

export default App;
