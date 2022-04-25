const errorResponse = require('../../utils/errorResponse');

class PlaylistHandler {
  constructor(playlistService, validator) {
    this._playlistService = playlistService;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
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

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    try {
      const playlists = await this._playlistService.getPlaylist({ owner: credentialId });

      return {
        status: 'success',
        data: {
          playlists,
        },
      };
    } catch (error) {
      return errorResponse(error, h);
    }
  }

  async deletePlaylistByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: owner } = request.auth.credentials;

      await this._playlistService.verifyPlaylistOwner(id, owner);
      await this._playlistService.deletePlaylistById(id);

      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus playlist',
      });

      return response;
    } catch (error) {
      return errorResponse(error, h);
    }
  }
}

module.exports = PlaylistHandler;
