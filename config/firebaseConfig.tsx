import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0zD8rB4iU9IzhansOsPfWbOgBVuzdj2w",
  authDomain: "petmatchapp-d7ffd.firebaseapp.com",
  projectId: "petmatchapp-d7ffd",
  storageBucket: "petmatchapp-d7ffd.appspot.com",
  messagingSenderId: "5279812468",
  appId: "1:5279812468:web:8ff7ea47a298827dbbba21"
};

if (!firebase.default.apps.length) {
  firebase.default.initializeApp(firebaseConfig);
}

export { firebase };