import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyC3K06R0qOUj8_xq-lgceiJoWrdADElEPw",
    authDomain: "revents-1f9b1.firebaseapp.com",
    databaseURL: "https://revents-1f9b1.firebaseio.com",
    projectId: "revents-1f9b1",
    storageBucket: "revents-1f9b1.appspot.com",
    messagingSenderId: "854521195148",
    appId: "1:854521195148:web:af82f83115634ef2e0a9a9",
    measurementId: "G-H3CHVK1STR"
  }

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({timestampsInSnapshots:true})

export default firebase