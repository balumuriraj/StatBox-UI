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
  description: string;
  genre: any[];
  poster: string;
  runtime: string;
  rating: number;
  cast: any[];
  crew: any[];
  moviesAroundReleaseDate: Items;
  isSeen: boolean;
  isBookmarked: boolean;
  userRating: number;
}

export interface AuthState {
  user: {
    id: number;
    name: string;
    photo: string;
    lastLogin: number;
    userSince: number;
    bookmarks: Items;
    seen: Items;
    reviewed: Items;
  },
  isLoggedIn: boolean;
  token: string;
}

export interface RootState {
  home: HomeState;
  auth: AuthState;
  movie: MovieState;
  celeb: CelebState;
}

interface Items {
  items: any[];
  count: number;
}