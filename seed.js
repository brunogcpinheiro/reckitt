const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDyfr8-dmHZoGR7ehAcbOzj6wBC1hCNq0E",
  authDomain: "reckitt-formulario.firebaseapp.com",
  databaseURL: "https://reckitt-formulario.firebaseio.com",
  projectId: "reckitt-formulario",
  storageBucket: "",
  messagingSenderId: "280111051036",
  appId: "1:280111051036:web:2da2f5711d1c2637"
});

const db = firebase.firestore();

function seedData(col) {
  col.forEach(function(obj) {
    let ref = db.collection("sos").doc(obj.id);
    ref
      .set({
        id: obj.id,
        value: obj.value,
        label: obj.label
      })
      .then(function() {
        console.log("Document written with ID: ", obj.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  });
}

seedData();
