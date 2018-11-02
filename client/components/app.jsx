import React from 'react';
import '../styles/App.css';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import Photo from './Photo';
import Synopsis from './Synopsis';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      summary: {
        title: 'wedding crashers',
        genre: 'comedy',
        releaseDate: 'June 20th, 2000',
        photos: [],
        synopsis: '',
      },
      index: 0,
      translateValue: 0,
    };
    this.nextPhoto = this.nextPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
  }

  componentDidMount() {
    const id = Math.floor(Math.random() * 100);
    fetch(`/api/movies/${id}/summary`)
      .then((response) => {
        response.json().then((data) => {
          this.setState({
            summary: data,
          });
        });
      })
      .catch(error => console.error(error));
  }

  nextPhoto() {
    const { index } = this.state;
    const { summary } = this.state;
    if (summary.photos.length < 4) {
      return;
    }
    if (index !== summary.photos.length - 3) {
      this.setState(prevState => ({
        index: prevState.index + 1,
        translateValue: prevState.translateValue - this.photoWidth(),
      }));
    }
  }

  photoWidth() {
    return document.querySelector('.photo').clientWidth;
  }

  prevPhoto() {
    const { index } = this.state;
    if (index !== 0) {
      this.setState(prevState => ({
        index: prevState.index - 1,
        translateValue: prevState.translateValue + this.photoWidth(),
      }));
    }
  }

  handleMouseEnter(e) {
    e.target.className = 'hover';
  }

  handleMouseLeave(e) {
    e.target.className = 'trailer';
  }

  render() {
    const { summary } = this.state;
    const titleAndYear = `${summary.title.toUpperCase()} (${summary.releaseDate.slice(-4)})`;
    const { translateValue } = this.state;

    return (
      <div>
        <div className="title-box">
          <h2 className="title">{titleAndYear}</h2>
        </div>

        <div className="movie-box">
          <div><img className="trailer" alt="movie poster" onMouseEnter={e => this.handleMouseEnter(e)} onMouseLeave={e => this.handleMouseLeave(e)} src={summary.trailer} /></div>
          <div className="movie-details">
            <h2 className="release-date">{summary.releaseDate}</h2>
            <div className="rating-duration">
              {summary.rating}
              ,
              {summary.duration}
            </div>
            <div className="genre">{summary.genre.toUpperCase()}</div>
            <h2 className="score">
              <span role="img" aria-label="milk">🥛</span>
              {summary.score}
              %
            </h2>
          </div>
        </div>

        <Synopsis synopsis={summary.synopsis} title={titleAndYear} />

        <div className="carousel">
          <div className="left-arrow">
            <LeftArrow prevPhoto={this.prevPhoto} />
          </div>
          <div className="photos-container">
            <div
              className="photos"
              style={{
                transform: `translateX(${translateValue}px)`,
                transition: 'transform ease-out 0.45s',
              }}
            >
              {summary.photos.map(ele => <Photo photo={ele} />)}
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
