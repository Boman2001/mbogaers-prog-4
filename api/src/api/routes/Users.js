const express = require('express');
const users = require('../services/Users');

const router = new express.Router();


/**
 * Get a User.
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await users.getUserDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Deletes an existing User.
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await users.deleteUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Edit a User.
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await users.editUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Register a User.
 */
router.post('/register', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await users.registerUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Log a User In.
 */
router.post('/login', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await users.loginUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
