/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  // memberikan constraint foreign key pada kolom owner
  pgm.addConstraint('playlists', 'fk_playlists.owner_notes.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // hapus constraint
  pgm.dropConstraint('playlists', 'fk_playlists.owner_notes.id');
  // hapus table
  pgm.dropTable('playlists');
};
