import { getMoviesByYears, getMovieById, getMoviesByYearMonth, getMoviesCountByYearMonth } from '@/api/falcor/movie';
import { getReviewsCountById, getReviewsById } from '@/api/falcor/review';
import { getRoleCountByMovieId, getRoleByMovieId } from '@/api/falcor/role';
import { getUserById } from '@/api/falcor/critic';
import { getCelebById } from '@/api/falcor/celeb';

export async function getMovies() {
  const years = [2017, 2016]; // 2017, 2016, 2015
  return await getMoviesByYears(years);
}

export async function getMovie(id: number) {
  const movie = await getMovieById(id);

  // cast
  const castCount = await getRoleCountByMovieId(id, 'cast');
  const cast = await getRoleByMovieId(id, 'cast', castCount);
  movie.cast = cast;

  // crew
  const crewCount = await getRoleCountByMovieId(id, 'crew');
  const crew = await getRoleByMovieId(id, 'crew', crewCount);
  movie.crew = crew;

  // reviews
  const reviewsCount = await getReviewsCountById(id, 'movie');
  const reviews = await getReviewsById(id, 'movie', reviewsCount);
  movie.reviews = reviews;

  // ratings
  const ratings: number[] = [];

  for (const index in reviews) {
    if (reviews[index]) {
      const review = reviews[index];

      if (review.rating) {
        ratings.push(review.rating);
      }
    }
  }
  movie.ratings = getBins(ratings.sort());

  // movies by month
  const date = new Date(movie.date);
  const year = date.getFullYear();
  const month = date.getUTCMonth() + 1;
  const moviesByMonthCount = await getMoviesCountByYearMonth(year, month);
  const moviesByMonth = await getMoviesByYearMonth(year, month, moviesByMonthCount);
  movie.moviesByMonth = moviesByMonth;

  console.log(movie);

  return movie;
}

export async function getCeleb(id: number) {
  const celeb = await getCelebById(id);
  return celeb;
}

export async function getUser(id: number) {
  const userId = id || 1;
  const user = await getUserById(id);
  const reviewsCount = await getReviewsCountById(id, 'user');
  const reviews = await getReviewsById(id, 'user', reviewsCount);

  // ratings
  const ratings: number[] = [];

  for (const index in reviews) {
    if (reviews[index]) {
      const review = reviews[index];

      if (review.rating) {
        ratings.push(review.rating);
      }
    }
  }
  user.ratings = getBins(ratings.sort());

  return user;
}

// utils

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
