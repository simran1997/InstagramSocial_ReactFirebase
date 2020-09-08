


  import firebase from 'firebase';

const firebaseConfig = {
  {add ur config key here}
  };

  // Initialize Firebase with a "default" Firebase project
var firebaseProject = firebase.initializeApp(firebaseConfig);

console.log(firebaseProject.name);  // "[DEFAULT]"

// Option 1: Access Firebase services via the defaultProject variable
// var defaultStorage = defaultProject.storage();
var db = firebaseProject.firestore();

// Option 2: Access Firebase services using shorthand notation
var storage = firebase.storage();
var auth = firebase.auth();
// constdefaultFirestore = firebase.firestore();

export { db, storage, auth };
