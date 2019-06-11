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
      const series: any[] = [];

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
            showGrid: true
          },
          axisX: {
            showGrid: false,
            labelInterpolationFnc: (value: any, index: any) => {
              return index % 2 !== 0 ? value : '';
            }
          }
        };
        const responsiveOptions: any = [
          ['screen and (max-width: 500px)', {
            axisX: {
              labelInterpolationFnc: (value: any, index: any) => {
                if (series.length === 10) {
                  return index % 2 !== 0 ? value : null;
                }

                return index % 3 === 0 ? value : null;
              }
            }
          }]
        ];
        chart = new Chartist.Bar(elm, { labels, series }, options, responsiveOptions);
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
              return index % 3 === 0 ? value : '';
            }
          }
        };
        chart = new Chartist.Line(elm, { labels, series: [series] }, options);
      } else if (this.type === 'pie') {
        const options = {
          donut: true,
          // donutWidth: 100,
          // donutSolid: true,
          startAngle: 270,
          total: 200,
          showLabel: true
        };
        chart = new Chartist.Pie(elm, { labels, series: [20, 10, 30, 40] }, options);
      }

      // (window as any).chart = chart;

      chart.on('draw', (data: any) => {
        if (data.type === 'point') {
          data.element._node.style.stroke = '#32ff7e';
          data.element._node.style.strokeWidth = 15;
          data.element._node.style.strokeOpacity = '0';

          if (data.value.y === max) {
            data.element._node.style.stroke = '#ff4d4d';
            data.group.elem('text', {
              x: data.x,
              y: data.y - 10
            }, 'bar-label').text(data.value.y.toLocaleString());
          }

          let elm: any = null;

          data.element._node.addEventListener('mouseover', () => {
            data.element._node.style.strokeOpacity = '1';
            elm = data.group.elem('text', {
              x: data.x,
              y: data.y - 10
            }, 'bar-label').text(data.value.y.toLocaleString());
          });

          data.element._node.addEventListener('mouseout', () => {
            data.element._node.style.strokeOpacity = '0';
            if (elm) {
              data.element._node.parentNode.removeChild(elm._node);
            }
          });
        }

        if (data.type === 'bar') {
          const width = data.chartRect.width();
          const count = data.axisX.ticks.length + (data.series > 10 ? 5 : 2);
          data.element._node.style['stroke-width'] = `${width / count}`;

          if (data.series === max && max > 0) {
            data.element._node.style.stroke = '#ff4d4d';
            const elm = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            elm.innerHTML = data.series.toLocaleString();
            elm.setAttribute('x', data.x2);
            elm.setAttribute('y', String(data.y2 - 10));
            elm.setAttribute('class', 'bar-label');
            data.group._node.parentNode.appendChild(elm);
          }

          if (data.series !== min) {
            let elm: any = null;

            data.element._node.addEventListener('mouseover', () => {
              elm = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              elm.innerHTML = data.series.toLocaleString();
              elm.setAttribute('x', data.x2);
              elm.setAttribute('y', data.y2 - 10);
              elm.setAttribute('class', 'bar-label');
              data.group._node.parentNode.appendChild(elm);
            });

            data.element._node.addEventListener('mouseout', () => {
              if (elm) {
                data.group._node.parentNode.removeChild(elm);
              }
            });
          }
        }

        if (data.type === 'line') {
          data.element._node.style.stroke = '#32ff7e';
        }
      });
    }

  }
}
