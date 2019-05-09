import { EventBus } from '@/events';

function Catch(target: any, key: any, descriptor: any) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      if (err && err.message === 'invalid_token') {
        this.$store.dispatch('notification/set', { message: 'Login Required!' });
        this.$store.dispatch('auth/logout');
        this.$forceUpdate();
      } else if (err && Array.isArray(err) && err[0] && err[0].value === 'Not Authorized') {
        // this.$store.dispatch('notification/set', { message: 'Not Authorized! Login required.' });
        EventBus.$emit('toggleLoginModal');
      } else {
        this.$store.dispatch('notification/set', { message: err.message });
      }
    }
  };

  return descriptor;
}

export default Catch;
