import { Component, Vue } from 'vue-property-decorator';
import Menu from '@/components/common/Menu';
import Footer from '@/components/common/Footer';

@Component({
  components: {
    Menu,
    Footer
  }
})
export default class Movies extends Vue {}
