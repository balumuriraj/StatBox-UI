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

const init = (context: any) => {
  firebase.initializeApp(config);
  context.$store.dispatch('initialiseStore');
};

const initObserver = (context: any) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log('user logged in!');

      if (!context.$store.state.auth.token) {
        user.getIdToken(/* forceRefresh */ true).then((token) => {
          // Send token to your backend via HTTPS
          context.$store.dispatch('auth/setAuthUser', { token, user });
        }).catch((error) => {
          // Handle error
        });
      }
    } else {
      // console.log('user logged out!');
    }

    const requireAuth = context.$route.matched.some((record: any) => record.meta.requireAuth);
    const guestOnly = context.$route.matched.some((record: any) => record.meta.guestOnly);

    if (requireAuth && !user) {
      context.$router.push('login');
    } else if (guestOnly && user) {
      context.$router.push('dashboard');
    }
  });
};

const initUI = (container: any) => {
  let ui: any = null;
  const AuthUI = firebaseui.auth.AuthUI;

  if ((AuthUI as any).getInstance()) {
    ui = (AuthUI as any).getInstance();
  } else {
    ui = new AuthUI(firebase.auth());
  }

  ui.start(container, uiConfig);
};

const logout = async () => {
  await firebase.auth().signOut();
};

export default { init, initObserver, initUI, logout };
