// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB8_XvSn9-vKl_PIYe5PZbwN7ymMuo6X2I',
    authDomain: 'ty-thorsen.firebaseapp.com',
    databaseURL: 'https://ty-thorsen.firebaseio.com',
    projectId: 'ty-thorsen',
    storageBucket: 'ty-thorsen.appspot.com',
    messagingSenderId: '950989676426'
  }
};
