import { Component, Prop, Vue } from 'vue-property-decorator';
import Title from '@/components/common/Title';
import * as authStore from '@/store/modules/auth';

@Component({
  components: {
    Title
  }
})
export default class Trophies extends Vue {
  @Prop() public title!: string;
  @Prop() public subtitle!: string;
  @Prop() public type!: 'earned' | 'waiting' | 'all';

  private all = [
    {
      name: 'The Beginning',
      description: 'First Rating for a movie',
      icon: 'certificate',
      color: 'bronze',
      ratings: 1
    },
    {
      name: 'A Good Start',
      description: 'Rate 10 movies',
      icon: 'certificate',
      color: 'silver',
      ratings: 10
    },
    {
      name: 'In a Flash',
      description: 'Rate 25 movies',
      icon: 'certificate',
      color: 'gold',
      ratings: 25
    },
    {
      name: 'The Beginning',
      description: 'Rate 50 movies',
      icon: 'shield-alt',
      color: 'bronze',
      ratings: 50
    },
    {
      name: 'A Good Start',
      description: 'Rate 75 movies',
      icon: 'shield-alt',
      color: 'silver',
      ratings: 75
    },
    {
      name: 'In a Flash',
      description: 'Rate 100 movies',
      icon: 'shield-alt',
      color: 'gold',
      ratings: 100
    },
    {
      name: 'The Beginning',
      description: 'Rate 150 movies',
      icon: 'trophy',
      color: 'bronze',
      ratings: 150
    },
    {
      name: 'A Good Start',
      description: 'Rate 200 movies',
      icon: 'trophy',
      color: 'silver',
      ratings: 200
    },
    {
      name: 'In a Flash',
      description: 'Rate 250 movies',
      icon: 'trophy',
      color: 'gold',
      ratings: 250
    }
  ];

  private getEarnedTrophies() {
    return this.all.filter((trophy) => this.user.reviewed.count >= trophy.ratings);
  }

  private getWaitingTrophies() {
    return this.all.filter((trophy) => !(this.user.reviewed.count >= trophy.ratings));
  }

  get user() {
    return authStore.getUser(this.$store);
  }

  get trophies() {
    switch (this.type) {
      case 'earned': {
        return this.getEarnedTrophies();
      }
      case 'waiting': {
        return this.getWaitingTrophies();
      }
      default: {
        return this.all;
      }
    }
  }
 }
