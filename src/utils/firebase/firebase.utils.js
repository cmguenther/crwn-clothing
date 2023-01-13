import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBI-PinQYyrn5FDhq0Zo_4Kx33JvVgh-SI",
  authDomain: "crwn-clothing-db-e8646.firebaseapp.com",
  projectId: "crwn-clothing-db-e8646",
  storageBucket: "crwn-clothing-db-e8646.appspot.com",
  messagingSenderId: "318608836657",
  appId: "1:318608836657:web:8218570c95901d5a632d10",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }

    return userDocRef;
  }

  //If user data does not exists
  //Create / set the document with the data from userAuth in my collection

  //if user data exists

  //return userDocRef
};
