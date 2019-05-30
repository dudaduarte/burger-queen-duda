import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCR82bD0pNtHz5LvyAP5V5ys8MxDIoNRIs",
    authDomain: "burger-queen-6223d.firebaseapp.com",
    databaseURL: "https://burger-queen-6223d.firebaseio.com",
    projectId: "burger-queen-6223d",
    storageBucket: "burger-queen-6223d.appspot.com",
    messagingSenderId: "529160120777",
    appId: "1:529160120777:web:7ac7dfa9729cc936"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;