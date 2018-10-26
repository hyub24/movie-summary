var faker = require('faker');
var fs = require('fs');

var genres = ['horror', 'comedy', 'action', 'drama', 'documentary', 'adult', 'animation'];
var year = [2017,2000,1996,2002,2018,1992,2010];
var photos = ['https://s3-us-west-1.amazonaws.com/moovi-photos/0001.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0002.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0003.jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0004.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0005.jpg',
              'https://s3-us-west-1.amazonaws.com/moovi-photos/IMG_8645.JPG', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+from+iOS+(1).jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+from+iOS.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS+(1).jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS+(2).jpg',
              'https://s3-us-west-1.amazonaws.com/moovi-photos/Image+uploaded+from+iOS.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(1).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(2).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(3).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(4).jpeg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/download+(5).jpeg',
              'https://s3-us-west-1.amazonaws.com/moovi-photos/download.jpeg']

var csvMaker = (num = 100) => {
  for(let i = 0; i<num; i++) {
  	let movie = {};
  	movie.title = faker.lorem.words();
  	movie.rating = Math.floor(Math.random()*100);
  	movie.trailer = photos[Math.floor(Math.random()*17)]
  	movie.photos = [photos[Math.floor(Math.random()*17)], photos[Math.floor(Math.random()*17)], photos[Math.floor(Math.random()*17)], photos[Math.floor(Math.random()*17)], photos[Math.floor(Math.random()*17)]];
  	movie.genre = genres[Math.floor(Math.random()*7)];
  	movie.cast = [faker.name.findName(),faker.name.findName(),faker.name.findName(),faker.name.findName(),faker.name.findName()];
  	movie.director = faker.name.findName();
  	movie.year = year[Math.floor(Math.random()*7)];
    movie.synopsis = faker.lorem.paragraph();

    let row = `\n${movie.title}, ${movie.rating}, ${movie.genre}, ${movie.director}, ${movie.year}, ${movie.trailer}, [${movie.cast}], ${movie.photos}, ${movie.synopsis}`;

    fs.appendFile('./seed-data/summaries/summaries.csv', row, (err) => {
      if(err) throw err;
    })
  }
}

csvMaker(2);
