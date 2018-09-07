import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import { baseUrl } from '../config';

const model = new falcor.Model({
  source: new HttpDataSource(baseUrl + '/model.json', { withCredentials: false })
});

const batchModel = model.batch();

export default batchModel;
