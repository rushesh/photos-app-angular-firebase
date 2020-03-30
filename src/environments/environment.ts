// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyCBri1uXVayTJEzVT9H3sfQl3SQO6oAd6o",
    authDomain: "angular-image-gallery-6e84c.firebaseapp.com",
    databaseURL: "https://angular-image-gallery-6e84c.firebaseio.com",
    projectId: "angular-image-gallery-6e84c",
    storageBucket: "angular-image-gallery-6e84c.appspot.com",
    messagingSenderId: "830419863234",
    appId: "1:830419863234:web:0f030b1003de17a78d1d5b",
    measurementId: "G-PX1B6SXSH3"
  },
  loginDB:{
    cred1admin:{
      id:'admin123@photosapp.org',
      password:'Admin1@123',
      name:'admin1'
    },
    cred2admin:{
      id:'admin@photosapp.org',
      password:'Admin2@123',
      name:'admin2'
    },
    cred1test:{
      id:'test123@photosapp.org',
      password:'Test1@123',
      name:'tester1'
    },
    cred2test:{
      id:'test@photosapp.org',
      password:'Test2@123',
      name:'tester2'
    }
  },
  timerLogout:100
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
