const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

router.get('/', async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  res.render('home', { user: req.user, images });
});

router.get('/dashboard', ensureAuth, async (req, res) => {
  const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.render('dashboard', { user: req.user, images });
});

router.post('/add-image', ensureAuth, async (req, res) => {
  await Image.create({
    userId: req.user.id,
    username: req.user.username,
    imageUrl: req.body.imageUrl
  });
  res.redirect('/dashboard');
});

router.post('/delete-image/:id', ensureAuth, async (req, res) => {
  await Image.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.redirect('/dashboard');
});

module.exports = router;