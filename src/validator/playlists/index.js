const InvariantError = require('../../exception/InvariantError');
const PostPlaylistsPayloadSchema = require('./schema');

const PlaylistValidator = {
  validatePostPlaylistsPayload: (payload) => {
    const validationResult = PostPlaylistsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
