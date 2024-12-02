const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();
const predictCollection = db.collection('predictions');

async function storeData(id, data) { 
  return predictCollection.doc(id).set(data);
}

async function getHistories() {
  const snapshot = await predictCollection.get();
  const result = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    result.push({
      id: data.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: data.id,
      },
    });
  });
  return result;
}
 
module.exports = {
  storeData,
  getHistories,
};