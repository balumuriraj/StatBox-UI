import model from '@/api/falcor/model';

export async function getCelebData(celebId: string): Promise<any> {
  const response = await model.get([
    'celebsById', [celebId],
    ['name', 'photo', 'dob']]
  );

  const celeb: any = response.json.celebsById[celebId];
  const { name, photo, dob } = celeb;
  return { name, photo, dob };
}
