import { poll } from "../db.js";

const create = async (post_id, url_photo) => {
  const { rows } = await poll.query(
    `
    INSERT INTO photos (post, photo) 
      VALUES ($1, $2) 
      RETURNING *`,
    [post_id, url_photo]
  );
  return rows;
};

const getPhotos = async (post_id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM photos 
        WHERE post = $1`,
    [post_id]
  );
  return rows;
};

export const PhotoModel = {
  getPhotos,
  create,
};
