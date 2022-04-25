/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  // mengubah kolom albumId ke album_id
  pgm.sql('ALTER TABLE songs RENAME COLUMN "albumId" TO album_id');

  // membuat album baru
  pgm.sql("INSERT INTO albums(id, name, year) VALUES ('old_albums', 'old_albums', 2022)");

  // mengubah nilai albumId pada song yang bernilai null
  pgm.sql("UPDATE songs SET album_id = 'old_albums' WHERE album_id = NULL");

  // membuat constraint fk pada albumid terhadap id pada tabel album
  pgm.addConstraint('songs', 'fk_songs.album_id_albums.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  // hapus constraint
  pgm.dropConstraint('songs', 'fk_songs.album_id_albums.id');

  // mengubah nilai old album
  pgm.sql("UPDATE songs SET album_id = NULL WHERE album_id = 'old_albums'");

  // menghapus old album
  pgm.sql("DELETE FROM albums WHERE id = 'old_albums'");

  // mengubah kolom albumId ke album_id
  pgm.sql('ALTER TABLE songs RENAME COLUMN album_id TO "albumId"');
};
