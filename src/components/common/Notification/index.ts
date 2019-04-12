import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Notification extends Vue {
  get message() {
    return this.$store.state.notification.message;
  }

  get isLoading() {
    return this.$store.state.notification.isLoading;
  }
}
