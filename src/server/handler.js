const loadModel = require('../services/loadModel');
const predictCancer = require('../services/inferenceService');
const { sendSuccessResponse } = require('../utils/responseHelpers');
const crypto = require('crypto');

const predict = async (req, res, next) => {
  try {
    const file = req.file;
    const model = await loadModel();
    const prediction = await predictCancer(model, file.buffer);
    res.status(200).json(sendSuccessResponse(res, { prediction }, 200, 'Model is predicted successfully'));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  predict,
};