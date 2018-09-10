import axios from 'axios';
import { baseUrl } from '../config';

export async function getUserId(idToken: string) {
  const response: any = await axios({
    method: 'GET',
    url: `${baseUrl}/api/rest/getUserId`,
    headers: { Authorization: `${idToken}` }
  });

  return response.data.userId;
}