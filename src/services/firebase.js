import firebase from "@firebase/app"
import "@firebase/auth"
import "@firebase/firestore"

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.store = firebase.firestore
    this.auth = firebase.auth
  }

  get polls() {
    return this.store().collection("polls")
  }
}

export default new Firebase()
