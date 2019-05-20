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
  @Prop() public type!: string;
  @Prop() public title!: string;
  @Prop() public subtitle!: string;
  @Prop() public numbers!: any;

  @Watch('numbers')
  public onNumbersChange(val: number, oldVal: number) {
    this.drawChart();
  }

  private mounted() {
    this.drawChart();
  }

  private drawChart() {
    const elm = document.getElementById(this.id);

    if (elm && this.numbers) {
      elm.style.maxHeight = '250px';
      // elm.style.maxWidth = '800px';

      const labels = Object.keys(this.numbers).sort();
      const series = [];

      for (const key of labels) {
        series.push(this.numbers[key]);
      }

      const max = Math.max(...series);
      const min = max * 0.01;

      for (let i = 0; i < series.length; i++) {
        series[i] = series[i] || min;
      }

      // for (let i = 0; i < labels.length; i = i + 2) {
      //   labels[i] = '';
      // }

      let chart = null;

      if (this.type === 'bar') {
        const options = {
          distributeSeries: true,
          chartPadding: {
            left: -20,
            top: 21
          },
          axisY: {
            showLabel: false,
            showGrid: false
          },
          axisX: {
            showGrid: false,
            labelInterpolationFnc: (value: any, index: any) => {
              return index % 2  !== 0 ? value : null;
            }
          }
        };
        chart = new Chartist.Bar(elm, { labels, series }, options);
      } else if (this.type === 'line') {
        const options = {
          chartPadding: {
            left: -20,
            top: 21
          },
          showArea: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          axisY: {
            showLabel: false,
            showGrid: false
          },
          axisX: {
            showGrid: false,
            labelOffset: {
              x: -15,
              y: 0
            },
            labelInterpolationFnc: (value: any, index: any) => {
              return index % 3  === 0 ? value : null;
            }
          }
        };
        chart = new Chartist.Line(elm, { labels, series: [series] }, options);
      }

      (window as any).chart = chart;

      chart.on('draw', (data: any) => {
        const opacityAnimationOptions = {
          dur: 1000,
          from: 0,
          to: 1,
          easing: 'ease'
        };

        if (data.type === 'point') {
          data.element._node.style.stroke = '#32ff7e';

          let elm: any = null;

          data.element._node.addEventListener('mouseover', () => {
            elm = data.group.elem('text', {
              x: data.x,
              y: data.y - 10,
              style: 'text-anchor: middle;'
            }, 'label').text(data.value.y);
            elm._node.style.fill = 'white';
          });

          data.element._node.addEventListener('mouseout', () => {
            if (elm) {
              data.element._node.parentNode.removeChild(elm._node);
            }
          });

          data.element.animate({
            y: {
              dur: '0.5s',
              from: 0,
              to: data.y,
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        }

        if (data.type === 'bar') {
          const width = data.chartRect.width();
          const count = data.axisX.ticks.length + (data.series > 10 ? 5 : 2);
          data.element._node.style['stroke-width'] = `${width / count}`;

          if (data.series === max) {
            data.element._node.style.stroke = '#ff4d4d';
          }

          if (data.series !== min) {
            const elm = data.group.elem('text', {
              x: data.x2,
              y: data.y2 - 10,
              style: 'text-anchor: middle;'
            }, 'label').text(data.series);
            elm._node.style.fill = 'white';

            elm.animate({
              opacity: opacityAnimationOptions
            });
          }

          data.element.animate({
            y2: {
              dur: '0.5s',
              from: data.y1,
              to: data.y2
            }
          });
        }

        if (data.type === 'line') {
          data.element._node.style.stroke = '#32ff7e';
        }

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 2000 * data.index,
              dur: 2000,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        }
      });
    }

  }
}
