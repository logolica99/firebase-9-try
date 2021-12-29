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
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(
  colRef,

  orderBy("createdAt", "desc")
);

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
    createdAt: serverTimestamp(),
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

// get a single element
const docRef = doc(db, "books", "45B69tdRj56lAt2Nz5rE");

// getDoc(docRef).then((doc) => {     //
//   console.log(doc.data(), doc.id);  //// single time time
// });                                  //

onSnapshot(docRef, (doc) => {
  //
  console.log(doc.data(), doc.id); //// real time
}); //

//updating a document

const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "to be or not to be",
  }).then(() => {
    updateForm.reset();
  });
});

//signing users up
const signupForm = document.querySelector(".signup");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password, "poggers")
    .then((cred) => {
      console.log("user created: ", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
});

// logging in and out
const logoutButton = document.querySelector(".logout");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      console.log("the user is signed out");
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user logged in: ", cred.user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});
