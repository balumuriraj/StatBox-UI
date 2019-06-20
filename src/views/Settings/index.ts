import { Component, Vue } from 'vue-property-decorator';
import * as authStore from '@/store/modules/auth';
import { deleteAccount } from '@/api';
import firebaseAuth from '@/auth';

@Component
export default class Settings extends Vue {
  public showConfirm: boolean = false;

  get token() {
    return authStore.token(this.$store);
  }

  get user() {
    return authStore.getUser(this.$store);
  }

  get isDirty() {
    return !!(this.selectedAvatar || this.selectedTheme);
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

  public themes: any = [
    { name: 1, url: '1.svg' },
    { name: 2, url: '2.svg' },
    { name: 3, url: '3.svg' },
    { name: 4, url: '4.svg' },
    { name: 5, url: '5.svg' },
    { name: 6, url: '6.svg' },
    { name: 7, url: '7.svg' },
    { name: 8, url: '8.svg' },
    { name: 9, url: '9.svg' },
    { name: 10, url: '10.svg' },
    { name: 11, url: '11.svg' },
    { name: 12, url: '12.svg' },
    { name: 13, url: '13.svg' },
    { name: 14, url: '14.svg' },
    { name: 15, url: '15.svg' }
  ];

  public selectedAvatar: string = null;
  public selectedTheme: string = null;
  public metaInfo(): any {
    return {
      title: `${this.user.name} | Settings`
    };
  }

  public save() {
    if (this.selectedAvatar && this.selectedAvatar !== this.user.avatar) {
      authStore.saveUserAvatar(this.$store, { avatar: `${this.selectedAvatar}.png` });
    }

    if (this.selectedTheme && this.selectedTheme !== this.user.theme) {
      authStore.saveUserTheme(this.$store, { theme: `${this.selectedTheme}.svg` });
    }

    this.selectedAvatar = null;
    this.selectedTheme = null;
  }

  public async confirmDelete() {
    await deleteAccount(this.token);
    await firebaseAuth.deleteUser();
    this.$store.dispatch('auth/logout');
  }
}
