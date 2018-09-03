import model from '@/api/falcor/model';

export async function getCelebById(celebId: string): Promise<any> {
  return await model.get([
    'celebsById', [celebId],
    ['name', 'photo', 'dob']]
  )
    .then((response: any) => {
      const celeb: any = response.json.celebsById[celebId];
      const { name, photo, dob } = celeb;
      return { name, photo, dob };
    });
}
