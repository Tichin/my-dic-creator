// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBk83fIEBAMTFiVHrJIQxaARkvdiKtjjT8',
  authDomain: 'vocabulary-store-7ec5d.firebaseapp.com',
  projectId: 'vocabulary-store-7ec5d',
  storageBucket: 'vocabulary-store-7ec5d.appspot.com',
  messagingSenderId: '161555108239',
  appId: '1:161555108239:web:3d03ede6fcc35311f93bfa',
  measurementId: 'G-TPY8Y2D7Y6',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

export const addCollectionAndDocuments = async (objectsToAdd) => {
  const batch = writeBatch(db);
  // const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(
      collection(db, object.collectionKey),
      object.docRef.toLowerCase()
    );
    batch.set(docRef, object);
  });

  //
  await batch.commit();
  console.log('done');
};

export const updateDocument = async (collectionKey, docRef, definition) => {
  const docReference = doc(db, collectionKey, docRef.toLowerCase());

  await updateDoc(docReference, {
    definition,
  });
};

export const createNewDoc = async (collectionKey, docRef, objectToAdd) => {
  const docReference = doc(db, collectionKey, docRef);
  await setDoc(docReference, objectToAdd);
  return docReference;
};

export const getWordDocuments = async (collectionKey) => {
  const querySnapshot = await getDocs(collection(db, collectionKey));

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots

  //   console.log(doc.id, ' => ', doc.data());
  // });

  const docs = querySnapshot.docs.map((doc) => doc.data());
  return docs;
};
