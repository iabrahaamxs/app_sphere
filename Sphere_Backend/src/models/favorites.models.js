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

const getFavorite = async (id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM favorites WHERE favorite_user = $1`,
    [id]
  );
  return rows;
};

export const FavoriteModel = {
  create,
  getFavorite,
};
