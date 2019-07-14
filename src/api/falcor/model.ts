import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import { baseUrl } from '../config';
import auth from '@/auth';

class FalcorDataSource extends HttpDataSource {
  public async onBeforeRequest(config: any) {
    // const localStore = JSON.parse(sessionStorage.getItem('store') as any);
    // const token = localStore && localStore.auth && localStore.auth.token;
    const token = await auth.getToken();

    if (token) {
      config.headers.authorization = token;
    } else {
      delete config.headers.authorization;
    }
  }
}

const model = new falcor.Model({
  source: new FalcorDataSource(baseUrl + '/api/model.json', { withCredentials: false, timeout: 50000000 })
});

const batchModel = model.batch();

export default batchModel;
