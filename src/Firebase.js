import firebase from 'firebase';

// // <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"></script>

// // <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#config-web-app -->


  const firebaseConfig = {
    apiKey: "AIzaSyDfNfluBzxZqWxjXKOod5Q33fEmYwEi6Do",
    authDomain: "bitter-parent.firebaseapp.com",
    databaseURL: "https://bitter-parent.firebaseio.com",
    projectId: "bitter-parent",
    storageBucket: "",
    messagingSenderId: "404805487682",
    appId: "1:404805487682:web:a44240d52cdaf9ae9c31db"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;


