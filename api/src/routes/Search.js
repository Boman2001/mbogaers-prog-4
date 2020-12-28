const express = require('express');
const search = require('../services/Search');

const router = new express.Router();


/**
 * Get a Song.
 */
router.get('/Users/:query', async (req, res, next) => {
  const options = {
    query: req.params['query']
  };

  try {
    const result = await search.searchUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Song.
 */
router.get('/Songs/:query', async (req, res, next) => {
  const options = {
    query: req.params['query']
  };

  try {
    const result = await search.searchSong(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Playlist.
 */
router.get('/Playlists/:query', async (req, res, next) => {
  const options = {
    query: req.params['query']
  };

  try {
    const result = await search.searchPlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
