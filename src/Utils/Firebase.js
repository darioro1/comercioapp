import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyCYazon6dADOZwlQ4ot45dJ72Qe778TNVg",
	authDomain: "comercio-86d9c.firebaseapp.com",
	projectId: "comercio-86d9c",
	storageBucket: "comercio-86d9c.appspot.com",
	messagingSenderId: "435347434227",
	appId: "1:435347434227:web:749b31f8302d6e47abe586"
  };
  // Initialize Firebase
  export const firebaseapp = firebase.initializeApp(firebaseConfig);