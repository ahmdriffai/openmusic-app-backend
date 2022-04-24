require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const albums = require('./api/albums');
const songs = require('./api/songs');
const users = require('./api/users');
const AlbumsService = require('./services/postgres/AlbumsService');
const SongsService = require('./services/postgres/SongsService');
const UserService = require('./services/postgres/UserService');
const AuthenticationService = require('./services/postgres/AuthenticationService');
const AlbumValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');
const UserValidator = require('./validator/users');
const authentications = require('./api/authentications');
const TokenManager = require('./tokenize/TokenManager');
const AuthenticationsValidator = require('./validator/authentcations');

const init = async () => {
  const albumService = new AlbumsService();
  const songService = new SongsService();
  const userService = new UserService();
  const authenticationService = new AuthenticationService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: userService,
        validator: UserValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongsValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationService,
        userService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
  ]);

  // plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  // strategi authentikasi jwt
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decode.payload.id,
      },
    }),
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
