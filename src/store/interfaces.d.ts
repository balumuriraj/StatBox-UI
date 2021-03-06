export interface HomeState {
  movies: Map<string, Items>
}

export interface CelebState {
  name: string;
  photo: string;
  dob: string;
  movies: Items;
}

export interface GenreState {
  genreList: Items;
  currentGenre: {
    id: number;
    name: string;
    movies: Items;
  }
}

export interface MovieState {
  id: string;
  title: string;
  cert: string;
  releaseDate: string;
  genre: any[];
  poster: string;
  runtime: string;
  rating: number;
  ratingsCount: number;
  cast: any[];
  crew: any[];
  moviesAroundReleaseDate: Items;
  isFavorite: boolean;
  isBookmarked: boolean;
  ratingBins: any;
  attributes: any;
  userReview: {
    rating: number,
    watchWith: string,
    pace: string,
    story: string,
    rewatch: string
  };
}

export interface AuthState {
  user: {
    id: number;
    name: string;
    avatar: string;
    theme: string;
    photo: string;
    lastLogin: number;
    userSince: number;
    bookmarks: Items;
    favorites: Items;
    reviewed: Items;
    metadata: {
      genres: any[];
      ratingBins: any;
      moviesCount: number;
      movieMinutes: number;
      topActors: any[];
      topDirectors: any[];
    }
  },
  isLoggedIn: boolean;
  token: string;
  showModal: boolean;
}

export interface NotificationState {
  message: string;
  isLoading: boolean;
  isError: boolean;
}

export interface RootState {
  auth: AuthState;
  genre: GenreState;
  home: HomeState;
  notification: NotificationState;
}

interface Items {
  items: any[];
  count: number;
}