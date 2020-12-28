const express = require('express');
const songs = require('../services/Songs');

const router = new express.Router();


/**
 * Create a Song.
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await songs.createSong(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a Song.
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await songs.updateSong(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Song.
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await songs.getSongDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Deletes an existing Song.
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await songs.deleteSong(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
