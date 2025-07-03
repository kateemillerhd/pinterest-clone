const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
const path = require('path');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
       passport.authenticate('github', { failureRedirect: '/' }),
       (req, res) => {
         res.redirect('/');
       });

app.get('/logout', (req, res) => {
  req.logout()) => res.redirect('/'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

