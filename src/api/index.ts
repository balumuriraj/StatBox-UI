import { getMovieById, getMoviesBetweenDates, getMovieMetadataById } from '@/api/falcor/movie';
import { getMoviesByCelebId } from '@/api/falcor/role';
import { getCelebById } from '@/api/falcor/celeb';
import { getUserId } from '@/api/rest/user';
import { getUser, addBookmark, removeBookmark, addSeen, removeSeen, updateReview } from '@/api/falcor/user';

export async function getUserInfo(idToken: string, userId?: number) {
  let id: any = userId;

  if (!id) {
    id =  await getUserId(idToken);
  }

  return await getUser(id);
}

export async function updateUserBookmark(userId: number, movieId: number, isPush: boolean) {
  if (isPush) {
    return await addBookmark(userId, movieId);
  } else {
    return await removeBookmark(userId, movieId);
  }
}

export async function updateUserSeen(userId: number, movieId: number, isPush: boolean) {
  if (isPush) {
    return await addSeen(userId, movieId);
  } else {
    return await removeSeen(userId, movieId);
  }
}

export async function updateUserReview(review: any) {
  return await updateReview(review);
}

export async function getMoviesBetweenDatesRange(date1: number, date2: number, range: { from: number; to: number; }) {
  const result = await getMoviesBetweenDates(date1, date2, range);
  const movies = result.movies.map((movie: any) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      cert: movie.cert,
      runtime: movie.runtime,
      releaseDate: movie.releaseDate
    };
  });

  return { movies, count: result.count };
}

async function getMoviesAroundDate(date: any, days: number = 10) {
  const date1 = new Date(date);
  const date2 = new Date(date);
  const startDate = date1.setDate(date1.getDate() - days);
  const endDate = date2.setDate(date2.getDate() + days);

  return await getMoviesBetweenDatesRange(startDate, endDate, { from: 0, to: 9 });
}

export async function getMovie(id: number) {
  const movie = await getMovieById(id);
  movie.moviesThisMonth = await getMoviesAroundDate(movie.releaseDate);

  // // reviews
  // const reviewsCount = await getReviewsCountById(id, 'movie');
  // const reviews = await getReviewsById(id, 'movie', reviewsCount);
  // movie.reviews = reviews;

  // // ratings
  // const ratings: number[] = [];

  // for (const index in reviews) {
  //   if (reviews[index]) {
  //     const review = reviews[index];

  //     if (review.rating) {
  //       ratings.push(review.rating);
  //     }
  //   }
  // }
  // movie.ratings = getBins(ratings.sort());

  return movie;
}

export async function getMovieMetadata(id: number) {
  return await getMovieMetadataById(id);
}

export async function getMoviesByCeleb(id: string) {
  const movies = await getMoviesByCelebId(id, 10);

  // remove duplicates
  const movieIds: string[] = [];

  return movies.map((movie: any) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster,
      rating: movie.rating
    };
  }).filter((movie: any) => {
    if (movieIds.indexOf(movie.id) === -1) {
      movieIds.push(movie.id);
      return true;
    }
  });
}

export async function getCeleb(id: string) {
  const celeb = await getCelebById(id);
  return celeb;
}

// export async function getUser(id: string) {
//   const userId = id || 1;
//   const user = await getUserById(id);
//   const reviewsCount = await getReviewsCountById(id, 'user');
//   const reviews = await getReviewsById(id, 'user', reviewsCount);

//   // ratings
//   const ratings: number[] = [];

//   for (const index in reviews) {
//     if (reviews[index]) {
//       const review = reviews[index];

//       if (review.rating) {
//         ratings.push(review.rating);
//       }
//     }
//   }
//   user.ratings = getBins(ratings.sort());

//   return user;
// }

// // utils

// function getBins(data: number[]) {
//   const size = 0.5;
//   const count = 6 / size;
//   let bins = new Array(count).fill(0);

//   for (const rating of data) {
//     bins[Math.floor(rating / size)]++;
//   }

//   const maxCount = Math.max(...bins);
//   const noise = maxCount * 0.15;

//   bins = bins.map((c, i) => {
//     if (i === 0 || i === count - 1) {
//       return c;
//     }

//     return c + noise;
//   });

//   return bins;
// }
