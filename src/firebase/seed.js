import db from "./init";

const stores = [
  {
    id: "HShas2as",
    flag: "Walmart",
    region: "sul"
  },
  {
    id: "78as7ys",
    flag: "Carrefour",
    region: "norte"
  }
];

function seedData(col) {
  col.forEach(function(obj) {
    let ref = db.collection("stores").doc(obj.id);
    ref
      .set({
        id: obj.id,
        flag: obj.bandeira,
        region: obj.region
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
