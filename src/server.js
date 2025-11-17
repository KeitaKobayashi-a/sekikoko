const express = require('express');
const db = require('./db');
const cors = require('cors');
const readSeats = require('./handlers/readSeats');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.use(express.json());

app.get('/seats', async (req, res) => {
  res.json(await readSeats(db));
});

app.listen(PORT, () => {
  console.log(
    `Is your server running? Well, you better go catch it, then! http://localhost:${PORT}`
  );
});
