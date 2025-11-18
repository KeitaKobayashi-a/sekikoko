const express = require('express');
const db = require('./db');
const cors = require('cors');
const readSeats = require('./handlers/readSeats');
const deleteSeats = require('./handlers/deleteSeats');
const cookieParser = require('cookie-parser');
const receptionSeats = require('./handlers/receptionSeats');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

function setupServer() {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async function (username, password, done) {
      const user = await db('users').where({ username }).first();
      if (!user) {
        return done(null, false, {
          message: 'ユーザーIDが正しくありません。',
        });
      }

      if (user.password !== password)
        return done(null, false, {
          message: 'パスワードが正しくありません。',
        });
      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db('users').where({ id }).first();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  app.get('/seats', async (req, res) => {
    res.json(await readSeats(db));
  });

  app.post('/seats', async (req, res) => {
    const ticketNumber = Math.floor(Math.random() * 1000);
    try {
      res.cookie('ticketNumber', ticketNumber);
      res.json({ data: await receptionSeats(db, ticketNumber), ticketNumber });
    } catch (error) {
      res.cookie('ticketNumber', ticketNumber);
      res.json({
        data: { target: `${ticketNumber}番でお待ちください` },
        ticketNumber,
      });
    }
  });

  app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ login: true, user: req.user });
  });

  app.delete('/seats', async (req, res) => {
    res.json(await deleteSeats(db, req.cookies.ticketNumber));
  });
  return app;
}
module.exports = {
  setupServer,
};
