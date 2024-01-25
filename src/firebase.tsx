// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { UserInfo } from "./types";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "commerce-fee29.firebaseapp.com",
  projectId: "commerce-fee29",
  storageBucket: "commerce-fee29.appspot.com",
  messagingSenderId: "15783501222",
  appId: "1:15783501222:web:0c81c141fefd0bf5ecc367",
  measurementId: "G-FD0CJWB3K4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

//Email 회원가입
export function signUp(user: UserInfo) {
  return createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // signed in
      const singedInUser = userCredential.user;
      console.log(singedInUser);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}
// export function updateUser() {
//   return updateProfile(auth.currentUser, {
//     displayName: nickname,
//     photoURL: '',
//   })
//     .then(() => {
//       console.log();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }
//Email 로그인
export function logIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}
