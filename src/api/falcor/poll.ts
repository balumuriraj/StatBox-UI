import model from '@/api/falcor/model';

export async function getPolls(range: { from: number; to: number; }): Promise<any> {
  const countResponse = await model.get(['polls', 'length']);
  const count = countResponse.json.polls.length;

  if (range.to > count - 1) {
    range.to = count - 1;
  }

  const response = await model.get([
    'polls', range,
    ['id', 'title', 'image', 'type', 'filter', 'suggestions', 'timestamp'],
    { from: 0, to: 2 }, ['id', 'title', 'poster', 'releaseDate', 'rating']
  ]);

  const pollsObj: any = response.json.polls;
  const items: any[] = [];

  for (const index in pollsObj) {
    if (pollsObj[index] && pollsObj[index].id && typeof pollsObj[index].id === 'number') {
      const poll = pollsObj[index];

      const suggestionsObj = poll.suggestions;
      const suggestions: any[] = [];

      for (const i in suggestionsObj) {
        if (suggestionsObj[i] && suggestionsObj[i].id && typeof suggestionsObj[i].id === 'number') {
          const movieObj = suggestionsObj[i];

          suggestions.push({
            movie: {
              id: movieObj.id,
              poster: movieObj.poster,
              title: movieObj.title,
              rating: movieObj.rating,
              releaseDate: movieObj.releaseDate
            },
            isSuggested: true,
            count: 0
          });
        }
      }

      items.push({
        id: poll.id,
        title: poll.title,
        type: poll.type,
        filter: poll.filter,
        timestamp: poll.timestamp,
        image: poll.image,
        suggestions
      });
    }
  }

  return { items, count };
}

export async function getPollById(id: number) {
  const response = await model.unbatch().get([
    'pollsById', [id],
    ['userVote', 'votes', 'count']
  ]);

  const pollsObj: any = response.json.pollsById;
  const result: any[] = [];
  const moviesById: any = {};

  for (const index in pollsObj) {
    if (pollsObj[index] && (pollsObj[index].votes || pollsObj[index].movies || pollsObj[index].count != null)) {
      const poll = pollsObj[index];

      const votesArray = poll.votes;
      const userVote = poll.userVote;
      const hasUserVote = userVote && votesArray.some((vote: any) => vote.movieId === userVote.movieId);

      if (userVote && !hasUserVote) {
        votesArray.push(userVote);
      }

      const movieIds = votesArray.map((vote: any) => vote.movieId).filter((id: number) => !moviesById[id]);
      const response = await model.get([
        'moviesById', movieIds,
        ['id', 'title', 'releaseDate', 'poster', 'rating']
      ]);

      const moviesByIdResult: any = response.json.moviesById;

      for (const movieId of movieIds) {
        if (moviesByIdResult[movieId]) {
          const movieObj = moviesByIdResult[movieId];

          moviesById[movieId] = {
            id: movieObj.id,
            poster: movieObj.poster,
            title: movieObj.title,
            rating: movieObj.rating,
            releaseDate: movieObj.releaseDate
          };
        }
      }

      const votes: any[] = [];

      for (const voteObj of votesArray) {
        const movieObj = moviesById[voteObj.movieId];

        votes.push({
          movie: {
            id: movieObj.id,
            poster: movieObj.poster,
            title: movieObj.title,
            rating: movieObj.rating,
            releaseDate: movieObj.releaseDate
          },
          isSuggested: false,
          count: voteObj.count
        });
      }

      result.push({
        id,
        count: poll.count,
        userVote,
        votes
      });
    }
  }

  return result[0];
}
