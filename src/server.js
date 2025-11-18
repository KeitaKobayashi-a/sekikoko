const express = require('express');
const db = require('./db');
const cors = require('cors');
const readSeats = require('./handlers/readSeats');
const deleteSeats = require('./handlers/deleteSeats');
const cookieParser = require('cookie-parser');
const receptionSeats = require('./handlers/receptionSeats');
const PORT = process.env.PORT || 8080;

function setupServer() {
  

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/seats', async (req, res) => {
  res.json(await readSeats(db));
});

app.delete('/seats', async (req, res) => {
  res.json(await deleteSeats(db, req.cookies.ticketNumber));
});
app.post('/seats', async (req, res) => {
  const ticketNumber = Math.floor(Math.random() * 100);
  res.cookie('ticketNumber', ticketNumber);
  
  res.json({data:await receptionSeats(db, ticketNumber), ticketNumber});
});

app.listen(PORT, () => {
  console.log(
    `Is your server running? Well, you better go catch it, then! http://localhost:${PORT}`
  );
});
}
module.exports = {
  setupServer,
};