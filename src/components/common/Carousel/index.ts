import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Card from '@/components/common/Card/';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    Card,
    swiper,
    swiperSlide
  }
})
export default class Carousel extends Vue {
  @Prop() public title!: string;
  @Prop() public movies!: object[];
  @Prop() public count!: number;
  @Prop() public link!: string;

  public loading: boolean = false;

  public mounted() {
    if (this.count && this.count === this.movies.length) {
      this.swiper.removeSlide(this.movies.length);
      this.swiper.update();
    }

    this.swiper.on('reachEnd', () => {
      if (!this.loading) {
        if (this.movies.length < this.count) {
          this.loading = true;
          this.$emit('fetch');
        } else if (this.movies.length === this.count) {
          // this.swiper.removeSlide(this.movies.length);
          // this.swiper.update();
        }
      }
    });
  }

  @Watch('currentCount')
  public onCurrentCountChange(val: number, oldVal: number) {
    this.loading = false;
  }

  get currentCount(): number {
    return this.movies.length;
  }

  get swiper() {
    return (this.$refs.carousel as any).swiper;
  }

  get options() {
    return {
      slidesPerView: 2.5,
      centerInsufficientSlides: false,
      slidesPerGroup: 1,
      spaceBetween: 5,
      freeMode: true,
      preloadImages: false,
      loop: false,
      navigation: {
        nextEl: '.swiper-custom-next',
        prevEl: '.swiper-custom-prev'
      },
      breakpointsInverse: true,
      breakpoints: {
        1200: { // max-width
          slidesPerView: 6.5,
          spaceBetween: 10
        },
        1000: {
          slidesPerView: 5.5,
          spaceBetween: 7.5
        },
        800: {
          slidesPerView: 4.5
        },
        600: {
          slidesPerView: 3.5
        },
        500: {
          slidesPerView: 3.5
        }
      }
    };
  }
}
