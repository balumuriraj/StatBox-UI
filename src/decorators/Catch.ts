function Catch(target: any, key: any, descriptor: any) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(args: any) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      this.$store.dispatch('notification/set', { message: err.message });
      if (err && err.message === 'invalid_token') {
        this.$store.dispatch('notification/set', { message: 'Login Required!' });
        this.$store.dispatch('auth/logout');
        this.$forceUpdate();
      }
    }
  };

  return descriptor;
}

export default Catch;
