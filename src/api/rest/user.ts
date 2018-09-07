import axios from "axios";
import { baseUrl } from '../config';

export async function getUserId(idToken: string) {
  const response: any = await axios({ 
    method: "GET", 
    url: `${baseUrl}/rest/api/getUserId`,
    headers: { Authorization: `${idToken}` }
  });

  console.log(response);
  return response.data.userId;
}
