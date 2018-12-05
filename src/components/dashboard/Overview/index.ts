import { Component, Vue } from 'vue-property-decorator';
import CelebList from '@/components/common/CelebList';
import Chart from '@/components/common/Chart';
import Title from '@/components/common/Title';
import VueWordCloud from 'vuewordcloud';

@Component({
  components: {
    CelebList,
    Chart,
    Title,
    VueWordCloud
  }
})
export default class Overview extends Vue {
  get directors() {
    return [
      {
        name: 'test1',
        role: 'Director'
      },
      {
        name: 'test2',
        role: 'Director'
      },
      {
        name: 'test3',
        role: 'Director'
      },
      {
        name: 'test4',
        role: 'Director'
      },
      {
        name: 'test5',
        role: 'Director'
      }
    ];
  }

  get actors() {
    return [
      {
        name: 'test1',
        role: 'Actor'
      },
      {
        name: 'test2',
        role: 'Actor'
      },
      {
        name: 'test3',
        role: 'Actor'
      },
      {
        name: 'test4',
        role: 'Actor'
      },
      {
        name: 'test5',
        role: 'Actor'
      }
    ];
  }
}
