import { Component, Vue } from 'vue-property-decorator';
import * as authStore from '@/store/modules/auth';

@Component
export default class Settings extends Vue {
  public avatars: any = [
    { name: 1, url: 'avatar.png' },
    { name: 2, url: 'avatar.png' },
    { name: 3, url: 'avatar.png' },
    { name: 4, url: 'avatar.png' },
    { name: 5, url: 'avatar.png' },
    { name: 6, url: 'avatar.png' },
    { name: 7, url: 'avatar.png' },
    { name: 8, url: 'avatar.png' },
    { name: 9, url: 'avatar.png' },
    { name: 10, url: 'avatar.png' }
  ];

  public themes: any = [
    { name: 1, url: 'toprated.jpg' },
    { name: 2, url: 'trending.jpg' },
    { name: 3, url: 'toprated.jpg' },
    { name: 4, url: 'toprated.jpg' },
    { name: 5, url: 'toprated.jpg' },
    { name: 6, url: 'toprated.jpg' },
    { name: 7, url: 'toprated.jpg' },
    { name: 8, url: 'toprated.jpg' },
    { name: 9, url: 'toprated.jpg' },
    { name: 10, url: 'toprated.jpg' }
  ];

  public selectedAvatar: string = null;
  public selectedTheme: string = null;

  get user() {
    return authStore.getUser(this.$store);
  }

  get isDirty() {
    return !!(this.selectedAvatar || this.selectedTheme);
  }
}
