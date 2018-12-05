import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Chartist from 'chartist';
import Title from '@/components/common/Title';

@Component({
  components: {
    Title
  }
})
export default class Chart extends Vue {
  @Prop() public id!: string;
  @Prop() public title!: string;
  @Prop() public subtitle!: string;

  private mounted() {
    const elm = document.getElementById(this.id);
    const chart = new Chartist.Bar(elm, {
      labels: ['', '1', '', '2', '', '3', '', '4', '', '5'],
      series: [1, 5, 5, 5, 8, 17, 20, 35, 23, 5]
    }, {
        // low: 0,
        distributeSeries: true,
        axisY: {
          showLabel: false,
          showGrid: false
        },
        axisX: {
          showGrid: false
        }
      });
  }
}
