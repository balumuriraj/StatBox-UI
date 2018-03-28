import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

const baseUrl = 'http://mbalumuri-mac.esri.com:4000';

const model = new falcor.Model({
  source: new HttpDataSource(baseUrl + '/model.json', {
    // Options here
    // headers: {
    //     // Any headers here
    //     'Authorization': `bearer ' + token` // JWT
    // },
    withCredentials: false // , Cookies
    // crossDomain: true // CORSl
  })
});


export async function getMovies() {
  const years = [2017, 2016, 2015];
  const movies = await model.get(['moviesByYear', years, 'movies', {
    from: 0,
    to: 9
  },
    ['id', 'title', 'date', 'poster', 'runtime', 'rating']
  ])
    .then((response: any) => {
      const yearsObj = response.json.moviesByYear;
      const result: any[] = [];

      for (const year of years) {
        const moviesObj = yearsObj[year].movies;

        for (const movieId in moviesObj) {
          if (moviesObj[movieId] && moviesObj[movieId].title) {
            result.push(moviesObj[movieId]);
          }
        }
      }

      return result;
    });

  return movies;
}

export async function getMovie(id: number) {
  const movie = await model.get([
    'moviesById',
    [id],
    ['title', 'description', 'date', 'poster', 'runtime', 'genre', 'cert']
  ])
    .then((response: any) => {
      const result: any = response.json.moviesById[id];
      const { title, description, date, poster, runtime, genre, cert } = result;

      return { title, description, date, poster, runtime, genre, cert };
    });

  const reviewsCount = await model.get([
    'reviewsByMovieId',
    [id],
    'reviews', 'length'
  ])
    .then((response: any) => {
      return response.json.reviewsByMovieId[id].reviews.length;
    });

  const reviews = await model.get([
    'reviewsByMovieId',
    [id],
    'reviews', { length: reviewsCount },
    ['url', 'rating', 'critic']
  ])
    .then((response: any) => {
      const data = response.json.reviewsByMovieId[id].reviews;
      const result: any[] = [];

      for (const index in data) {
        if (data[index]) {
          const review = data[index];

          if (review.rating) {
            result.push({
              url: review.url,
              rating: review.rating,
              critic: review.critic
            });
          }
        }
      }
      return result;
    });

  const ratings: number[] = [];

  for (const index in reviews) {
    if (reviews[index]) {
      const review = reviews[index];

      if (review.rating) {
        ratings.push(review.rating);
      }
    }
  }

  movie.reviews = reviews;
  movie.ratings = getBins(ratings.sort());

  const castCount = await model.get([
    'castByMovieId',
    [id],
    'roles', 'length'
  ])
    .then((response: any) => {
      return response.json.castByMovieId[id].roles.length;
    });
  const cast = await model.get([
    'castByMovieId',
    [id],
    'roles', { length: castCount },
    ['id', 'type', 'category', 'celeb'],
    [ 'id', 'name', 'photo' ]
  ])
    .then((response: any) => {
      const data = response.json.castByMovieId[id].roles;
      const result: any[] = [];

      for (const index in data) {
        if (data[index]) {
          const role = data[index];

          if (role.celeb && role.celeb.name) {
            result.push({
              id: role.celeb.id,
              name: role.celeb.name,
              photo: role.celeb.photo,
              role: role.type
            });
          }
        }
      }
      return result;
    });

  movie.cast = cast;

  const crewCount = await model.get([
    'crewByMovieId',
    [id],
    'roles', 'length'
  ])
    .then((response: any) => {
      return response.json.crewByMovieId[id].roles.length;
    });
  const crew = await model.get([
    'crewByMovieId',
    [id],
    'roles', { length: castCount },
    ['id', 'type', 'category', 'celeb'],
    [ 'id', 'name', 'photo' ]
  ])
    .then((response: any) => {
      const data = response.json.crewByMovieId[id].roles;
      const result: any[] = [];

      for (const index in data) {
        if (data[index]) {
          const role = data[index];

          if (role.celeb && role.celeb.name) {
            result.push({
              id: role.celeb.id,
              name: role.celeb.name,
              photo: role.celeb.photo,
              role: role.type
            });
          }
        }
      }
      return result;
    });

  movie.crew = crew;

  console.log(movie);

  return movie;
}

export async function getUser(id: number) {
  const userId = id || 1;
  const user = await model.get(['criticsById', [userId], ['name', 'image']])
    .then((response: any) => {
      const user: any = response.json.criticsById[userId];
      const { name, image } = user;
      return { name, image };
    });
  const reviewsCount = await model.get(['reviewsByCriticId', [userId], 'reviews', 'length'])
    .then((response: any) => {
      return response.json.reviewsByCriticId[userId].reviews.length;
    });
  const ratings = await model.get([
    'reviewsByCriticId', [userId], 'reviews', { length: reviewsCount }, ['url', 'rating', 'critic']
  ])
    .then((response: any) => {
      const data = response.json.reviewsByCriticId[userId].reviews;
      const ratings: number[] = [];

      for (const index in data) {
        if (data[index]) {
          const review = data[index];

          if (review.rating) {
            ratings.push(review.rating);
          }
        }
      }

      return ratings;
    });

  user.ratings = getBins(ratings.sort());

  return user;
}

function getBins(data: number[]) {
  const size = 0.5;
  const count = 6 / size;
  let bins = new Array(count).fill(0);

  for (const rating of data) {
    bins[Math.floor(rating / size)]++;
  }

  const maxCount = Math.max(...bins);
  const noise = maxCount * 0.15;

  bins = bins.map((c, i) => {
    if (i === 0 || i === count - 1) {
      return c;
    }

    return c + noise;
  });

  return bins;
}
