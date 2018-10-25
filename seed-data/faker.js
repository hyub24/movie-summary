var faker = require('faker');
var fs = require('fs');

var data = []

var genres = ['horror', 'comedy', 'action', 'drama', 'documentary', 'adult', 'animation'];
var year = [2017,2000,1996,2002,2018,1992,2010];

var dataMaker = (num = 100) => {
  for(let i = 0; i<num; i++) {
  	var movie = {};
  	movie.title = faker.lorem.words();
  	movie.rating = Math.floor(Math.random()*100);
  	movie.trailer = faker.image.imageUrl();
  	movie.photos = [faker.image.imageUrl(),faker.image.imageUrl(),faker.image.imageUrl(),faker.image.imageUrl(),faker.image.imageUrl()];
  	movie.genre = genres[i];
  	movie.cast = [faker.name.findName(),faker.name.findName(),faker.name.findName(),faker.name.findName(),faker.name.findName()];
  	movie.director = faker.name.findName();
  	movie.year = year[i];
  	data.push(movie);
  }
}

dataMaker();

fs.writeFile('./seed-data/summaries/summaries.json', JSON.stringify(data), (err) => {
  if(err) {
  	console.log(err.message)
  }
})