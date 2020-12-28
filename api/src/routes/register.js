const express = require('express');
const register = require('../services/auth');

const router = new express.Router();


/**
 * Register a User.
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await register.registerUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
