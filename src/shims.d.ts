declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '@fortawesome/*';

declare module 'vue-awesome-swiper';

declare module 'vuewordcloud';

declare module "firebaseui" {

  import firebase from 'firebase';

  interface IConfig {
    callbacks?: ICallbacks;
    credentialHelper?: auth.CredentialHelper;
    queryParameterForSignInSuccessUrl?: string;
    queryParameterForWidgetMode?: string;
    signInFlow?: 'redirect' | 'popup';
    signInOptions: Array<ISignInOption | string>;
    signInSuccessUrl?: string;
    tosUrl: string;
  }
  interface ICallbacks {
    signInSuccess?: (currentUser: firebase.User, credential?: firebase.auth.AuthCredential, redirectUrl?: string) => boolean;
    uiShown?: () => void;
  }
  interface ISignInOption {
    provider: string;
    scopes?: Array<string>;
    requireDisplayName?: boolean;
  }

  namespace auth {
    enum CredentialHelper { ACCOUNT_CHOOSER_COM, NONE }
    class AuthUI {
      constructor(auth: firebase.auth.Auth);
      start(containerCSSselector: string, config: IConfig): void;
    }
  }
}
