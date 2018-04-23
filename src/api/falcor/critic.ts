import model from '@/api/falcor/model';

export async function getUserById(userId: number): Promise<any> {
  return await model.get([
    'criticsById', [userId],
    ['name', 'image']]
  )
    .then((response: any) => {
      const user: any = response.json.criticsById[userId];
      const { name, image } = user;
      return { name, image };
    });
}
