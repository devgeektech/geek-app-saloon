import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDSUbrp3XpBPdG2fU8fkTlz6t4w6MmRCnM",
    authDomain: "salon-3c450.firebaseapp.com",
    databaseURL: "https://salon-3c450-default-rtdb.firebaseio.com",
    projectId: "salon-3c450",
    storageBucket: "salon-3c450.appspot.com",
    messagingSenderId: "628679137322",
    appId: "1:628679137322:web:c34985ab5c0f71368e0b53",
    measurementId: "G-1LN4F6M7NT"
};

firebase.initializeApp(firebaseConfig);

export const signInWithGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("email");
        const res = await firebase.auth().signInWithPopup(provider);
        const token = await firebase.auth().currentUser?.getIdToken();
    } catch (err) {
        console.warn(err);
        
    }
};