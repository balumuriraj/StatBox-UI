import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import GenreCard from '@/components/common/GenreCard/';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

@Component({
  components: {
    GenreCard,
    swiper,
    swiperSlide
  }
})
export default class GenreCarousel extends Vue {
  @Prop() public title!: string;
  @Prop() public items!: object[];
  @Prop() public count!: number;
  @Prop() public link!: string;

  get options() {
    return {
      slidesPerView: 1.5,
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
        2000: {
          slidesPerView: 6.5
        },
        1800: {
          slidesPerView: 5.5
        },
        1600: {
          slidesPerView: 5.5
        },
        1400: {
          slidesPerView: 4.5
        },
        1200: {
          slidesPerView: 4.5
        },
        1000: {
          slidesPerView: 3.5
        },
        800: {
          slidesPerView: 3.5
        },
        600: {
          slidesPerView: 2.5
        },
        500: {
          slidesPerView: 2.5
        }
      }
    };
  }
}
