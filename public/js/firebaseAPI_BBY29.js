//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyCWhgO4QVvaujmCvvDpq8-ZJeboIifWvOA",
  authDomain: "bbyteam29.firebaseapp.com",
  projectId: "bbyteam29",
  storageBucket: "bbyteam29.firebasestorage.app",
  messagingSenderId: "1019385753365",
  appId: "1:1019385753365:web:648921e4086f435c4b031c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

