import model from '@/api/falcor/model';

export async function getUser(id: string): Promise<any> {
  return await model.get([
    "usersById", [id],
    ["id", "authId", "bookmarks", "seen"]
  ])
    .then((response: any) => {
      const userInfo = response.json["usersById"][id];

      return {
        id: userInfo.id,
        authId: userInfo.authId,
        bookmarks: userInfo.bookmarks,
        seen: userInfo.seen
      };
    });
}