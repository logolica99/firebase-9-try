import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcsTNGVdyyXdZ6vH5O1_OCTdcVIQjIym0",
  authDomain: "fir-9-try.firebaseapp.com",
  projectId: "fir-9-try",
  storageBucket: "fir-9-try.appspot.com",
  messagingSenderId: "924739429714",
  appId: "1:924739429714:web:680312f93f57da9edd068b",
  measurementId: "G-M2Y948NDYD",
};

//init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

//  get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err);
  });
