import { Component, Vue, Watch } from 'vue-property-decorator';
import Poll from '@/components/common/Poll';
import * as API from '@/api';
import Catch from '@/decorators/Catch';

@Component({
  components: {
    Poll
  }
})
export default class Polls extends Vue {

  public metaInfo(): any {
    return {
      title: 'Polls'
    };
  }

  @Catch
  private async loadData() {}

  private async mounted() {
    await this.loadData();
  }
}
