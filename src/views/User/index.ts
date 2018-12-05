import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '../../components/common/Footer';
import * as Chartist from 'chartist';

const options = {
  showArea: true,
  showLine: false,
  showPoint: false,
  fullWidth: true,
  chartPadding: {
    top: -10,
    right: 0,
    bottom: -25,
    left: 0
  },
  axisY: {
    offset: 0,
    showLabel: false,
    showGrid: false
  },
  axisX: {
    offset: 25,
    labelOffset: {
      x: 0,
      y: -25
    },
    // showLabel: false,
    showGrid: false
  }
};

@Component({
  components: {
    Menu, Footer
  }
})
export default class User extends Vue {
  private chart: any = null;

  private created() {
    this.$store.dispatch('userById', this.$route.params.id);
  }

  private mounted() {
    const elm = this.$el.getElementsByClassName('ct-chart')[0];
    this.chart = new Chartist.Line(elm, { labels: [], series: [] }, options);
  }

  get name() {
    const user = this.$store.getters.userById;

    if (this.chart) {
      const ratings = user && user.ratings;

      if (ratings) {
        this.chart.update({ labels: [null, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, null], series: [ratings] });
      }
    }
    return user && user.name;
  }

  get ratings() {
    const user = this.$store.getters.userById;
    const ratings = user && user.ratings;
    return ratings;
  }
}
