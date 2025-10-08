import { initializeApp } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDI7gJcThImcL9YsQJIuC54l1WOZ_hInjM",
  authDomain: "catalog-book-9c9a3.firebaseapp.com",
  databaseURL: "https://catalog-book-9c9a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catalog-book-9c9a3",
  storageBucket: "catalog-book-9c9a3.firebasestorage.app",
  messagingSenderId: "54012740786",
  appId: "1:54012740786:web:8917aeb257d99fbbbef5ab",
  measurementId: "G-MBMCWZS06H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db = getDatabase(app);
export { auth };
export default app;
export const storage = getStorage(app); 
export const googleProvider = new GoogleAuthProvider();