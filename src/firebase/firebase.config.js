// const firebaseConfig = {
//   apiKey: "AIzaSyDigjgv50iUyCDCHQVnWkMzyoA6U7agtgk",
//   authDomain: "hobbyhub-2cd93.firebaseapp.com",
//   projectId: "hobbyhub-2cd93",
//   storageBucket: "hobbyhub-2cd93.appspot.com",  
//   messagingSenderId: "212720208993",
//   appId: "1:212720208993:web:990ea32040c15f09dc2e20",
//   measurementId: "G-ZT3ERK41DG"
// };

// export default firebaseConfig;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

export default firebaseConfig;

