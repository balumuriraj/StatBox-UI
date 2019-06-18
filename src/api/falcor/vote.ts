import model from '@/api/falcor/model';

// TODO: enchance
export async function addVote(vote: any) {
  await model.call(
    ['addVote'],
    [vote]
  );
}

// TODO: enchance
export async function deleteVote(vote: any) {
  await model.call(
    ['deleteVote'],
    [vote]
  );
}
