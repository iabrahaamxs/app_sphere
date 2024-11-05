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
    SELECT f.favorite_id, f.post, p.post_user, p.description, p.post_created_at, u.name, u.user_photo, f.favorite_created_at
      FROM 
        favorites f
      JOIN 
        posts p ON f.post = p.post_id
      JOIN 
        users u ON p.post_user = u.user_id
      WHERE 
        f.favorite_user = $1
        AND f.favorite_deleted_at IS NULL
      ORDER BY favorite_created_at DESC`,
    [id]
  );
  return rows;
};

export const FavoriteModel = {
  create,
  getFavorite,
};
