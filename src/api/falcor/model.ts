import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import { baseUrl } from '../config';

const localStore = JSON.parse(localStorage.getItem('store') as any);
const token = localStore && localStore.auth && localStore.auth.token;

class FalcorDataSource extends HttpDataSource {
  public onBeforeRequest(config: any) {
    if (token) {
      config.headers.authorization = token;
    }
  }
}

const model = new falcor.Model({
  source: new FalcorDataSource(baseUrl + '/api/model.json', { withCredentials: false })
});

const batchModel = model.batch();

export default batchModel;
