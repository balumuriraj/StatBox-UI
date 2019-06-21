import { Component, Vue } from 'vue-property-decorator';
import * as authStore from '@/store/modules/auth';
import { deleteAccount } from '@/api';
import firebaseAuth from '@/auth';
import Catch from '@/decorators/Catch';

@Component
export default class Settings extends Vue {
  public showConfirm: boolean = false;
  public isLoading: boolean = false;
  public errMsg: string = null;

  get token() {
    return authStore.token(this.$store);
  }

  get user() {
    return authStore.getUser(this.$store);
  }

  get isDirty() {
    return !!this.selectedAvatar;
  }

  get userSinceDays() {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = Date.now();
    const secondDate = new Date(this.user.userSince).getTime();

    return Math.round(Math.abs((firstDate - secondDate) / (oneDay)));
  }

  public avatars: any = [
    { name: 1, url: '1.png' },
    { name: 2, url: '2.png' },
    { name: 3, url: '3.png' },
    { name: 4, url: '4.png' },
    { name: 5, url: '5.png' },
    { name: 6, url: '6.png' },
    { name: 7, url: '7.png' },
    { name: 8, url: '8.png' },
    { name: 9, url: '9.png' },
    { name: 10, url: '10.png' },
    { name: 11, url: '11.png' },
    { name: 12, url: '12.png' },
    { name: 13, url: '13.png' },
    { name: 14, url: '14.png' },
    { name: 15, url: '15.png' }
  ];

  public selectedAvatar: string = null;
  public metaInfo(): any {
    return {
      title: `${this.user.name} | Settings`
    };
  }

  public save() {
    if (this.selectedAvatar && this.selectedAvatar !== this.user.avatar) {
      authStore.saveUserAvatar(this.$store, { avatar: `${this.selectedAvatar}.png` });
    }

    this.selectedAvatar = null;
  }

  public login() {
    this.$store.dispatch('auth/openModal');
  }

  @Catch
  public async confirmDelete() {
    if (!this.isLoading) {
      try {
        this.isLoading = true;
        await deleteAccount(this.token);
        await firebaseAuth.deleteUser(this.token);
        this.isLoading = false;
        this.$store.dispatch('auth/logout');
      } catch (err) {
        this.isLoading = false;
        this.errMsg = 'Error! Please login and try again.';
      }
    }
  }
}
