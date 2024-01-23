import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByzFbZzNSB7aNnuXD7vm2Etf3Rd3YMaIE",
  authDomain: "tnc-io.firebaseapp.com",
  projectId: "tnc-io",
  storageBucket: "tnc-io.appspot.com",
  messagingSenderId: "153512127291",
  appId: "1:153512127291:web:e8fd87abf002cef202651e",
  measurementId: "G-V11V1TNW6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, 'gs://tnc-io.appspot.com');
const auth = getAuth(app);
export { auth, db, storage };
export default app;