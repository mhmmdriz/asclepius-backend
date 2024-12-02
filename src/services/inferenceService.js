const tf = require ('@tensorflow/tfjs-node');

async function predictCancer(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image, 3)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = await model.predict(tensor).data();
    const result = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';
    console.log(prediction);
  
    return result;
  } catch (error) {
    throw new Error('Terjadi kesalahan dalam melakukan prediksi');
  }
};

module.exports = predictCancer;