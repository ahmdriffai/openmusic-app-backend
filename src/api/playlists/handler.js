const errorResponse = require('../../utils/errorResponse');

class PlaylistHandler {
  constructor(playlistService, validator) {
    this._playlistService = playlistService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePostPlaylistsPayload(request.payload);

      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;
      const playlistId = await this._playlistService.addPlaylist({ name, owner: credentialId });

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return errorResponse(error, h);
    }
  }
}

module.exports = PlaylistHandler;
