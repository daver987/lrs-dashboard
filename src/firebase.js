// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase, ref, set, onValue } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: 'AIzaSyDc5Od3JofmTdwPFfxsI2CPZWjiHtBtoS8',
  authDomain: 'luxury-ride-database.firebaseapp.com',
  databaseURL: 'https://luxury-ride-database-default-rtdb.firebaseio.com',
  projectId: 'luxury-ride-database',
  storageBucket: 'luxury-ride-database.appspot.com',
  messagingSenderId: '922008073395',
  appId: '1:922008073395:web:32336a51d6597ce35d2cc6',
  measurementId: 'G-4FBXD4VQND',
})

// Initialize Firebase

export const db = getDatabase(app)
const analytics = getAnalytics(app)

export function saveData(path, dataToSave) {
  set(ref(db, path), dataToSave)
}

export function readData(path) {
  onValue(ref(db, path), (snapshot) => {
    const data = snapshot.val()
    return data
  })
}
