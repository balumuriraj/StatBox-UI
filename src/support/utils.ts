const genreIdByName: any = {
  'horror': 1,
  'thriller': 2,
  'action': 3,
  'romance': 4,
  'drama': 5,
  'family': 6,
  'comedy': 7,
  'crime': 8,
  'sci-fi': 14,
  'fantasy': 17
};

export function getGenreIdByName(genreName: string): number {
  genreName = genreName && genreName.toLowerCase();
  return genreIdByName[genreName];
}
