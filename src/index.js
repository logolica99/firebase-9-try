import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

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

// queries
const q = query(colRef, where("author", "!=", "Patrick rofus"));

//  get collection data
// getDocs(colRef)
//   .then((snapshot) => {
//     let books = [];
//     snapshot.docs.forEach((doc) => {
//       books.push({ ...doc.data(), id: doc.id });
//     });
//     console.log(books);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// real time data collection
onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// real time query data collection
onSnapshot(q, (snapshot) => {

  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
