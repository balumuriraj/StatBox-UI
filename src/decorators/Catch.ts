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
        this.$store.dispatch('notification/reset');
      } else if (err && Array.isArray(err) && err[0] && err[0].value === 'Not Authorized') {
        this.$store.dispatch('auth/openModal');
      } else {
        throw err;
      }
    }
  };

  return descriptor;
}

export default Catch;
