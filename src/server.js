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
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');

function setupServer() {
  const app = express();
  const staticPath = path.join(__dirname, '..', 'vite-project', 'dist');

  if (process.env.NODE_ENV === 'development') {
    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );
  }
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(staticPath));

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
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
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

  const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    return res.status(401).json({ message: 'ログインしてください' });
  };

  app.get('/seats', async (req, res) => {
    res.json(await readSeats(db));
  });

  app.post('/seats', isLoggedIn, async (req, res) => {
    const ticketNumber = Math.floor(Math.random() * 1000);
    try {
      const username = req.user.username;
      res.cookie('ticketNumber', ticketNumber);
      res.json({
        data: await receptionSeats(db, ticketNumber, username),
        ticketNumber,
      });
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

  app.delete('/seats', isLoggedIn, async (req, res) => {
    res.json(await deleteSeats(db, req.user.username));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
  return app;
}
module.exports = {
  setupServer,
};
