const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors')
const { errorMiddleware } = require('../middleware/error-middleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});