const errorResponse = require('../../utils/errorResponse');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongsPayload(request.payload);
      const {
        title, year, genre, performer, duration, albumId,
      } = request.payload;

      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
      });

      const response = h.response({
        status: 'success',
        data: {
          songId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      return errorResponse(error, h);
    }
  }

  async getSongsHandler(request) {
    const { title = '', performer = '' } = request.query;

    const songs = await this._service.getSongs({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const song = await this._service.getSongById(id);

      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      return errorResponse(error, h);
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongsPayload(request.payload);

      const { id } = request.params;
      const {
        title, year, genre, performer, duration,
      } = request.payload;

      await this._service.editSongById(id, {
        title,
        year,
        performer,
        genre,
        duration,
      });

      const response = h.response({
        status: 'success',
        message: 'Berhasil memperbarui song',
      });

      return response;
    } catch (error) {
      return errorResponse(error, h);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);

      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus song',
      });

      return response;
    } catch (error) {
      return errorResponse(error, h);
    }
  }
}

module.exports = SongsHandler;
