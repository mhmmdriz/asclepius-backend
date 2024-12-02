const loadModel = require('../services/loadModel');
const predictCancer = require('../services/inferenceService');
const { sendSuccessResponse } = require('../utils/responseHelpers');
const crypto = require('crypto');
const firestore = require('../services/firestore');

const predict = async (req, res, next) => {
  try {
    const file = req.file;
    const model = await loadModel();
    const { result, suggestion } = await predictCancer(model, file.buffer);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    data = {
      id,
      result,
      suggestion,
      createdAt,
    };

    await firestore.storeData(id, data);

    res.status(200).json(sendSuccessResponse(res, data, 201, 'Model is predicted successfully'));
  } catch (error) {
    next(error);
  }
}

const getHistories = async (req, res, next) => {
  try {
    const histories = await firestore.getHistories();
    res.status(200).json(sendSuccessResponse(res, histories, 200));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  predict,
  getHistories,
};