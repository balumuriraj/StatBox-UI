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
  date: string;
  description: string;
  genre: any[];
  poster: string;
  runtime: string;
  rating: string;
  cast: any[];
  crew: any[];
  moviesThisMonth: any[];
  ratings: any[];
  reviews: [];
}

export interface RootState {
  home: HomeState;
  user: any
}