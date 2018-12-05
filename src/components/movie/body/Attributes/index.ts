import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/common/Title';
import Progress from '@/components/movie/body/Progress';

@Component({
  components: {
    Title,
    Progress
  }
})
export default class Attributes extends Vue {
  get watchWithAttributes() {
    return [
      {
        name: 'Friends',
        value: 26
      },
      {
        name: 'Self',
        value: 10
      },
      {
        name: 'Family',
        value: 64
      }
    ];
  }

  get movieAttributes() {
    return [
      {
        name1: 'Slow',
        value1: 26,
        name2: 'Fast',
        value2: 0
      },
      {
        name1: 'Simple',
        value1: 0,
        name2: 'Complex',
        value2: 45
      },
      {
        name1: 'Light',
        value1: 0,
        name2: 'Dark',
        value2: 15
      }
    ];
  }
}
