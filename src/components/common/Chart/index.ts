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
  @Prop() public numbers!: number[];

  get series() {
    const min = 0;
    const max = 5;
    const bins = getEqualIntervalBins(min, max, 10);
    const result = this.numbers.length > 0 ?
      [0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] :
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.numbers.forEach((value) => {
      if (value != null &&  value >= min && value <= max) {
        const idx = binIndex(bins, value);

        if (idx > -1) {
          result[idx]++;
        }
      }
    });

    // result.splice(0, 0, 0); for Line chart

    return result;
  }

  private mounted() {
    const elm = document.getElementById(this.id);
    const chart = new Chartist.Bar(elm, {
      labels: ['', '1', '', '2', '', '3', '', '4', '', '5'],
      series: this.series // [1, 5, 5, 5, 8, 17, 20, 35, 23, 5]
    }, {
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
      });
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

