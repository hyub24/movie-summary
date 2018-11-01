import React from 'react';
import style from '../styles/App.css';
import RightArrow from './RightArrow.jsx';
import LeftArrow from './LeftArrow.jsx';
import Photo from './Photo.jsx';
import Synopsis from './Synopsis.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: {
        title: 'wedding crashers',
        genre: 'comedy',
        releaseDate: 'June 20th, 2000',
        photos:[]
      },
      index: 0,
      translateValue: 0
    }
    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
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

  nextPhoto() {
    if(this.state.index === this.state.summary.photos.length - 1) {
      return this.setState({
        index: 0,
        translateValue: 0
      })
    }
    
    this.setState(prevState => ({
      index: prevState.index + 1,
      translateValue: prevState.translateValue - this.photoWidth()
    }));

  }

  photoWidth() {
     return document.querySelector('.photo').clientWidth
  }

  prevPhoto() {
    if(this.state.index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
        translateValue: prevState.translateValue + this.photoWidth()
      }));
    }
  }

  handleMouseEnter(e) {
    e.target.className = 'hover';
  }

  render() {

    let titleAndYear = `${this.state.summary.title.toUpperCase()} (${this.state.summary.releaseDate.slice(-4)})`;

    return (
      <div>
        <div className="title-box">
          <h2 className="title">{titleAndYear}</h2>
        </div>

        <div className="movie-box">
          <div><img className="trailer" onMouseEnter={(e) => this.handleMouseEnter(e)} src={this.state.summary.trailer}/></div>
          <div className="movie-details">
            <h2 className="release-date">{this.state.summary.releaseDate}</h2>
            <div className="rating-duration">{this.state.summary.rating}, {this.state.summary.duration}</div>
            <div className="genre">{this.state.summary.genre.toUpperCase()}</div>
            <h2 className="score"><span>🥛</span> {this.state.summary.score}%</h2>
          </div>
        </div>
        
        <Synopsis synopsis={this.state.summary.synopsis} title={titleAndYear} />

        <div className="carousel">
          <div className="left-arrow">
            <LeftArrow prevPhoto={this.prevPhoto} />
          </div>
          <div className="photos-container">
            <div className="photos"
              style={{
                transform: `translateX(${this.state.translateValue}px)`,
                transition: 'transform ease-out 0.45s'
              }}>
              {this.state.summary.photos.map((ele, key) => {
                return <Photo photo={ele} key={key} />
              })}
            </div>
          </div>
          <div className="right-arrow">
            <RightArrow nextPhoto={this.nextPhoto} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
