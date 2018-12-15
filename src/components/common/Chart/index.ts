import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
  @Prop() public numbers!: any;

  get series() {
    const min = 0;
    const max = 5;
    const bins = getEqualIntervalBins(min, max, 10);
    const isEmpty = !this.numbers || Object.keys(this.numbers).length === 0;
    const result = isEmpty ?
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] :
      [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05];

    if (!isEmpty) {
      for (const rating in this.numbers) {
        if (this.numbers[rating]) {
          const count = this.numbers[rating];
          const idx = binIndex(bins, Number(rating));

          if (idx > -1) {
            result[idx] += count;
          }
        }
      }
    }

    // result.splice(0, 0, 0); for Line chart

    return result;
  }

  @Watch('numbers')
  public onNumbersChange(val: number, oldVal: number) {
    this.drawChart();
  }

  private mounted() {
    this.drawChart();
  }

  private drawChart() {
    const elm = document.getElementById(this.id);

    if (elm) {
      elm.style.maxHeight = '250px';
      elm.style.maxWidth = '500px';

      const labels = ['', '1', '', '2', '', '3', '', '4', '', '5'];
      const series = this.series; // [1, 5, 5, 5, 8, 17, 20, 35, 23, 5];
      const options = {
        // low: 0,
        distributeSeries: true,
        // For Line
        // showArea: true,
        // showLine: false,
        // showPoint: false,
        // fullWidth: true,
        axisY: {
          showLabel: false,
          showGrid: false
        },
        axisX: {
          showGrid: false
        }
      };
      const chart = new Chartist.Bar(elm, { labels, series }, options);
    }

  }
}

function getEqualIntervalBins(min: number, max: number, numBins: number): number[][] {
  const binSize = (max - min) / numBins;
  const intervals: number[][] = [];

  let minValue: number = min;
  let maxValue: number;

  for (let i = 1; i <= numBins; i++) {
    maxValue = minValue + binSize;

    intervals.push([
      minValue,
      maxValue // (i < numBins) ? maxValue : null
    ]);

    minValue = maxValue;
  }

  return intervals;
}

function binIndex(intervals: number[][], value: number): number {
  let idx = -1;

  for (let i = intervals.length - 1; i >= 0; i--) {
    const minValue = intervals[i][0];

    if (value > minValue) {
      idx = i;
      break;
    }
  }

  return idx;
}

