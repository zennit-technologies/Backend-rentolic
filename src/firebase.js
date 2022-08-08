import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyB0Cj1_SiV1xL6PiyO2GqR8sLqZz_W13zE",
//   authDomain: "ozyca-645d7.firebaseapp.com",
//   projectId: "ozyca-645d7",
//   storageBucket: "ozyca-645d7.appspot.com",
//   messagingSenderId: "792669544030",
//   appId: "1:792669544030:web:5f52c1852639519cb79ecf",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjNd5-n0m0NtT1qA4iKmgM3ahD2Podpas",
  authDomain: "ozyca-platforms.firebaseapp.com",
  databaseURL: "https://ozyca-platforms-default-rtdb.firebaseio.com",
  projectId: "ozyca-platforms",
  storageBucket: "ozyca-platforms.appspot.com",
  messagingSenderId: "1088297837073",
  appId: "1:1088297837073:web:2bd8e20eaa5c8180d507b0",
  measurementId: "G-LVN5TRY90T"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(); 
export { auth, firebase };