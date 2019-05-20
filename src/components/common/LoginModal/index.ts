import { Component, Vue, Watch } from 'vue-property-decorator';
import auth from '@/auth';
import * as authStore from '@/store/modules/auth';

@Component
export default class LoginModal extends Vue {
  get showModal() {
    return authStore.getShowModal(this.$store);
  }

  public closeModal() {
    this.$store.dispatch('auth/closeModal');
  }

  @Watch('showModal')
  public onShowModalChange(val: number, oldVal: number) {
    if (val) {
      this.$nextTick(() => {
        auth.initUI('#firebaseui-auth-container', this);
      });
    }
  }

  private mounted() {
    if (this.showModal) {
      auth.initUI('#firebaseui-auth-container', this);
    }
  }

}
