const express = require('express');
const playlists = require('../services/Playlists');

const router = new express.Router();


/**
 * Create a Playlist.
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body['body']
  };

  try {
    const result = await playlists.createPlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Update a Playlist.
 */
router.put('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await playlists.updatePlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Get a Playlist.
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await playlists.getPlaylistDetail(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * Deletes an existing Playlist.
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await playlists.deletePlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * add song to  a Playlist.
 */
router.post('/:id/add', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    body: req.body['body']
  };

  try {
    const result = await playlists.addSongToPlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

/**
 * remove song from  a Playlist.
 */
router.post('/:id/remove/', async (req, res, next) => {
  const options = {
    id: req.params['id'],
    songId: req.query['songId']
  };

  try {
    const result = await playlists.removeSongfromPlaylist(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
