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

export function getRange(movies: any) {
  const count = movies.count;
  const length = movies.items.length;

  if (count === 0 || (count > length)) {
    const from = length;
    const to = !count || (count - from > 10) ? length + 9 : count - 1;
    return { from, to };
  }
}
