const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDyfr8-dmHZoGR7ehAcbOzj6wBC1hCNq0E",
  authDomain: "reckitt-formulario.firebaseapp.com",
  databaseURL: "https://reckitt-formulario.firebaseio.com",
  projectId: "reckitt-formulario",
  storageBucket: "",
  messagingSenderId: "280111051036",
  appId: "1:280111051036:web:2da2f5711d1c2637"
});

var db = firebase.firestore();

const stores = [
  {
    id: "HShas2as",
    bandeira: "Walmart",
    regiao: "sul"
  },
  {
    id: "78as7ys",
    bandeira: "Carrefour",
    regiao: "norte"
  }
];

function seedData(col) {
  col.forEach(function(obj) {
    let ref = db.collection("stores").doc(obj.id);
    ref
      .set({
        id: obj.id,
        bandeira: obj.bandeira,
        regiao: obj.regiao
      })
      .then(function() {
        console.log("Document written with ID: ", obj.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  });
}

seedData(stores);
