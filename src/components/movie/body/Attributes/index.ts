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
  @Prop() public props!: any;

  get watchWithAttributes() {
    return [
      {
        name: 'Friends',
        value: this.props && this.props.watchWith.friends
      },
      {
        name: 'Self',
        value: this.props && this.props.watchWith.self
      },
      {
        name: 'Family',
        value: this.props && this.props.watchWith.family
      }
    ];
  }

  get movieAttributes() {
    return [
      {
        name1: 'Slow',
        value1: this.props && this.props.pace.slow,
        name2: 'Fast',
        value2: this.props && this.props.pace.fast
      },
      {
        name1: 'Simple',
        value1: this.props && this.props.story.simple,
        name2: 'Complex',
        value2: this.props && this.props.story.complex
      },
      {
        name1: 'Yes',
        value1: this.props && this.props.rewatch.yes,
        name2: 'No',
        value2: this.props && this.props.rewatch.no
      }
    ];
  }
}
