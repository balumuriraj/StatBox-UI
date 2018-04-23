import model from '@/api/falcor/model';

export async function getRoleCountByMovieId(movieId: number, type: string): Promise<number> {
  const path = type === 'cast' ? 'castByMovieId' : 'crewByMovieId';

  return await model.get([
    path, [movieId],
    'roles', 'length'
  ])
    .then((response: any) => {
      return response.json[path][movieId].roles.length;
    });
}

export async function getRoleByMovieId(movieId: number, type: string, count: number): Promise<any>  {
  const path = type === 'cast' ? 'castByMovieId' : 'crewByMovieId';

  return await model.get([
    path, [movieId],
    'roles', { length: count },
    ['id', 'type', 'category', 'celeb'],
    ['id', 'name', 'photo']
  ])
    .then((response: any) => {
      const data = response.json[path][movieId].roles;
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
}
