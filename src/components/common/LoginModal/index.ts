import { Component, Vue, Prop } from 'vue-property-decorator';
import { EventBus } from '@/events';
import auth from '@/auth';

@Component
export default class LoginModal extends Vue {
  public showModal: boolean = false;

  public closeModal() {
    this.showModal = false;
  }

  private mounted() {
    EventBus.$on('toggleLoginModal', () => {
      this.showModal = true;
      setTimeout(() => {
        auth.initUI('#firebaseui-auth-container');
      });
    });
  }
}
