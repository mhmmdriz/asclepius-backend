const tf = require ('@tensorflow/tfjs-node');
const sharp = require('sharp');
const InputError = require('../exceptions/InputError');

async function predictCancer(model, image) {
  try {
    // Check if image 3 channels or not
    const metadata = await sharp(image).metadata();
    if (metadata.channels !== 3) {
      throw new Error('Image harus memiliki 3 channel');
    }

    const tensor = tf.node
      .decodeImage(image, 3)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const prediction = await model.predict(tensor).data();
    const result = prediction[0] > 0.5 ? 'Cancer' : 'Non-cancer';

    let suggestion;

    if (result === 'Cancer') {
      suggestion = 'Segera periksa ke dokter!';
    } else if (result === 'Non-cancer') {
      suggestion = 'Penyakit kanker tidak terdeteksi.';
    }
  
    return { result, suggestion };
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }

};

module.exports = predictCancer;