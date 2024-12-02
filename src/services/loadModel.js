const tf = require('@tensorflow/tfjs-node');

let cachedModel = null;

async function loadModel() {
  if (!cachedModel) {
    cachedModel = await tf.loadGraphModel(process.env.MODEL_URL);
  }
  return cachedModel;
}

module.exports = loadModel;