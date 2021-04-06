import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
	apiKey: "AIzaSyBR37E33HpL7KqDTLWdTYwKicbVOIKkoU8",
	authDomain: "compscifridge.firebaseapp.com",
	databaseURL: "https://compscifridge.firebaseio.com",
	projectId: "compscifridge",
	storageBucket: "compscifridge.appspot.com",
	messagingSenderId: "68596534208",
	appId: "1:68596534208:web:6d9b0cab9a26e43cf2d625",
	measurementId: "G-EG7C7TPNR1",
});
export default firebase;
