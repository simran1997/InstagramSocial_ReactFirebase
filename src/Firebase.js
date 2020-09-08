


  import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBq0uFuCQv8Q81xqFGXa4E-MUXDx0rBmDY",
    authDomain: "my-socialplatform.firebaseapp.com",
    databaseURL: "https://my-socialplatform.firebaseio.com",
    projectId: "my-socialplatform",
    storageBucket: "my-socialplatform.appspot.com",
    messagingSenderId: "577870779592",
    appId: "1:577870779592:web:aecf751d7a26e32a72c1fd",
    measurementId: "G-DKE10EKMX5"
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