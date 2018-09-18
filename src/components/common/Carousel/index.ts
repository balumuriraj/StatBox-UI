import { Component, Prop, Vue } from 'vue-property-decorator';
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

  get placeholders() {
    const length = 6;
    const results: object[] = [];

    for (let i = 1; i <= length; i++) {
      results.push({
        id: `placeholder-${i}`
      });
    }

    return results;
  }

  get swiperOptions() {
    return {
      slidesPerView: 6,
      slidesPerGroup: 3,
      spaceBetween: 10,
      freeMode: true,
      loop: false,
      navigation: {
        nextEl: '.swiper-custom-next',
        prevEl: '.swiper-custom-prev'
      },
      pagination: {
        el: '.swiper-custom-pagination',
        clickable: true,
        bulletClass: 'swiper-custom-pagination-bullet',
        bulletActiveClass: 'swiper-custom-pagination-bullet-active'
      }
    };
  }
}
