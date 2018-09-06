// This import loads the firebase namespace along with all its type information.
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
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

const uiConfig: any = {
  signInSuccessUrl: '/dashboard',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const init = () => firebase.initializeApp(config);
const initObserver = (context: any) => {
  firebase.auth().onAuthStateChanged((user) => {
    context.$store.dispatch('auth/setAuthUser', { user });
    const requireAuth = context.$route.matched.some((record: any) => record.meta.requireAuth);
    const guestOnly = context.$route.matched.some((record: any) => record.meta.guestOnly);

    if (requireAuth && !user) {
      context.$router.push('login');
    } else if (guestOnly && user) {
      context.$router.push('dashboard');
    }
  });
};
const initUI = (container: any) => new firebaseui.auth.AuthUI(firebase.auth()).start(container, uiConfig);
const logout = () => firebase.auth().signOut();

export default { init, initObserver, initUI, logout };
