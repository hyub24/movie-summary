const faker = require('faker');
const fs = require('fs');

const genres = ['horror', 'comedy', 'action', 'drama', 'documentary', 'adult', 'animation'];
const releaseDate = ['October 5th, 2017', 'December 4th, 2000', 'November 20th, 1996', 'February 25th, 2002', 'May 20th, 2018', 'September 4th, 1992', 'August 23rd, 2010'];
const photos = ['https://s3-us-west-1.amazonaws.com/moovi-photos/0001.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0002.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0003.jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0004.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0005.jpg',
  'https://s3-us-west-1.amazonaws.com/moovi-photos/IMG_8645.JPG', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+from+iOS+(1).jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+from+iOS.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS+(1).jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS+(2).jpg',
  'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(5).jpeg',
  'https://s3-us-west-1.amazonaws.com/moovi-photos/download.jpeg'];
const rating = ['R', 'PG-13', 'PG', 'G', 'NC-17'];
const duration = ['2hr 15min', '3hr 5min', '1hr 30min', '2hr 45min', '5hr 10min', '55min'];

const jsonMaker = (num = 100) => {
  for (let i = 0; i < num; i += 1) {
    const movie = {};
    movie.id = i + 1;
    movie.title = faker.lorem.words();
    movie.score = Math.floor(Math.random() * 100);
    movie.duration = duration[Math.floor(Math.random() * 6)];
    movie.rating = rating[Math.floor(Math.random() * 5)];
    movie.trailer = photos[Math.floor(Math.random() * 17)];
    movie.photos = [photos[Math.floor(Math.random() * 17)], photos[Math.floor(Math.random() * 17)],
      photos[Math.floor(Math.random() * 17)], photos[Math.floor(Math.random() * 17)],
      photos[Math.floor(Math.random() * 17)]];
    movie.genre = genres[Math.floor(Math.random() * 7)];
    movie.cast = [faker.name.findName(), faker.name.findName(), faker.name.findName(),
      faker.name.findName(), faker.name.findName()];
    movie.director = faker.name.findName();
    movie.releaseDate = releaseDate[Math.floor(Math.random() * 7)];
    movie.synopsis = faker.lorem.paragraph();

    fs.appendFile('seed-data/summaries.json', `${JSON.stringify(movie)}\n`, (err) => {
      if (err) throw err;
    });
  }
};

jsonMaker();
