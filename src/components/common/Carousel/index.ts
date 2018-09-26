import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import MovieCard from '@/components/common/MovieCard/';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

@Component({
  components: {
    MovieCard,
    swiper,
    swiperSlide,
    FontAwesomeIcon
  }
})
export default class Carousel extends Vue {
  @Prop() public title!: string;
  @Prop() public movies!: object[];
  @Prop() public count!: number;

  public loading: boolean = false;

  public mounted() {
    if (this.count && this.count === this.movies.length) {
      this.swiper.removeSlide(this.movies.length);
      this.swiper.update();
    }

    this.swiper.on('reachEnd', () => {
      if (!this.loading) {
        console.log('length, count', this.movies.length, this.count);
        if (this.movies.length < this.count) {
          this.loading = true;
          this.$emit('fetch');
        } else if (this.movies.length === this.count) {
          this.swiper.removeSlide(this.movies.length);
          this.swiper.update();
        }
      }
    });
  }

  @Watch('currentCount')
  public onCurrentCountChange(val: number, oldVal: number) {
    console.log(oldVal, val, this.count);
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
      slidesPerView: 7,
      slidesPerGroup: 3,
      spaceBetween: 7,
      freeMode: true,
      loop: false,
      navigation: {
        nextEl: '.swiper-custom-next',
        prevEl: '.swiper-custom-prev'
      },
      breakpoints: {
        1024: {
          slidesPerView: 6,
          spaceBetween: 7
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 5
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 5
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 5
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 5
        }
      }
    };
  }
}
