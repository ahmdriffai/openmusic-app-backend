const InvariantError = require('../../exception/InvariantError');
const { PostPlaylistsPayloadSchema, PostPlaylistsSongsParamsSchema } = require('./schema');

const PlaylistValidator = {
  validatePostPlaylistsPayload: (payload) => {
    const validationResult = PostPlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validatePostPlaylistsSongsParams: (payload) => {
    const validationResult = PostPlaylistsSongsParamsSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
