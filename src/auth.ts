import firebase from 'firebase';
import firebaseui from 'firebaseui';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCFNSA0vXoLEpkbgOvJzi6WWiHMcLjoSl8',
  authDomain: 'statbox89.firebaseapp.com',
  databaseURL: 'https://statbox89.firebaseio.com',
  projectId: 'statbox89',
  storageBucket: 'statbox89.appspot.com',
  messagingSenderId: '472325102202'
};

const auth: any = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context: any) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: 'dashboard',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser');

      const requireAuth = this.context.$route.matched.some((record: any) => record.meta.requireAuth);
      const guestOnly = this.context.$route.matched.some((record: any) => record.meta.guestOnly);

      if (requireAuth && !user) {
        this.context.$router.push('login');
      } else if (guestOnly && user) {
        this.context.$router.push('dashboard');
      }
    });
  },
  authForm(container: any) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    firebase.auth().signOut();
  }
};

export default auth;
