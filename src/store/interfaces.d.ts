export interface HomeState {
  movies: {
    latest: any[];
    upcoming: any[];
  }
}

export interface CelebState {
  name: string;
  photo: string;
  dob: string;
  movies: {
    all: any[];
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
  moviesThisMonth: any[];
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
    bookmarks: any[];
    seen: any[];
    reviewed: any[];
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