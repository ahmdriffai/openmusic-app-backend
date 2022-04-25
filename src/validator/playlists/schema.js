const Joi = require('joi');

const PostPlaylistsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const PostPlaylistsSongsParamsSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PostPlaylistsPayloadSchema, PostPlaylistsSongsParamsSchema };
