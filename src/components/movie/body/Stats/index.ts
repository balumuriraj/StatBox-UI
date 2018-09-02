import { Component, Prop, Vue } from 'vue-property-decorator';
import * as Chartist from 'chartist';
import Title from '../Title';

@Component({
  components: {
    Title
  }
})
export default class Stats extends Vue {
  private mounted() {
    const lineElm = document.getElementById('distributionChart');
    const chart = new Chartist.Line(lineElm, {
      labels: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
      series: [
        [0, 5, 5, 5, 5, 8, 17, 20, 35, 23, 5, 0]
      ]
    }, {
        low: 0,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
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
