const bcrypt = require('bcrypt');
const db = require('../db');

async function localSt(username, password, done) {
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
}

function serialize(user, done) {
  done(null, user.id);
}

async function deserialize(id, done) {
  try {
    const user = await db('users').where({ id }).first();
    done(null, user);
  } catch (err) {
    done(err);
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'ログインしてください' });
}

module.exports = { localSt, serialize, deserialize, isLoggedIn };
