import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD9BmC5oYlcmpWar308pS5GVLwrESznQXQ",
  authDomain: "whatsapp-bd5dc.firebaseapp.com",
  projectId: "whatsapp-bd5dc",
  storageBucket: "whatsapp-bd5dc.appspot.com",
  messagingSenderId: "523912150721",
  appId: "1:523912150721:web:51496b4a5a5bb831d21e40",
  measurementId: "G-ZQ5YEDS6HT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// connectAuthEmulator(auth, 'http://localhost:9099');

export default auth;