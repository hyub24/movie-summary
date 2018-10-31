import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: {
        title: 'wedding crashers',
        genre: 'comedy',
        releaseDate: 'June 20th, 2000'
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
        <h2 className="title">{this.state.summary.title.toUpperCase()} ({this.state.summary.releaseDate.slice(-4)})</h2>
        <div className="movie-box">
          <div className="trailer"><img className="trailer-photo"src={this.state.summary.trailer}/></div>
          <div className="movie-details">
            <h2 className="release-date">{this.state.summary.releaseDate}</h2>
            <div className="rating-duration">{this.state.summary.rating}, {this.state.summary.duration}</div>
            <div className="genre">{this.state.summary.genre.toUpperCase()}</div>
            <h2 className="score"><span>🥛</span> {this.state.summary.score}%</h2>
          </div>
        </div>
        <h3 className="synopsis-header">Synopsis</h3>
        <div className="synopsis">{this.state.summary.synopsis}</div>
        <div className="photos">{this.state.summary.photos}</div>
        <div className="cast">{this.state.summary.cast}</div>
      </div>
    );
  }
}

export default App;
