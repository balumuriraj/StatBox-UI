import { Component, Vue } from 'vue-property-decorator';
import List from '@/components/common/MovieList';
import Menu from '@/components/common/Menu';
import Footer from '../../components/common/Footer';

@Component({
  components: {
    List,
    Menu,
    Footer
  }
})
export default class Home extends Vue { }
