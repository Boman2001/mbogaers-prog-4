const ServerError = require('../../lib/error');
/**
 * @param {Object} options
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.createPlaylist = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'createPlaylist ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Playlist to get.
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.updatePlaylist = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'updatePlaylist ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Playlist to get.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getPlaylistDetail = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getPlaylistDetail ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id The ID of the Playlist.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.deletePlaylist = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deletePlaylist ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Playlist to get.
 * @param {Object} options.body 
 * @throws {Error}
 * @return {Promise}
 */
module.exports.addSongToPlaylist = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'addSongToPlaylist ok!'
  };
};

/**
 * @param {Object} options
 * @param {Integer} options.id ID of the Playlist to get.
 * @param {Integer} options.songId ID of the Song to Remove.
 * @throws {Error}
 * @return {Promise}
 */
module.exports.removeSongfromPlaylist = async (options) => {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'removeSongfromPlaylist ok!'
  };
};

