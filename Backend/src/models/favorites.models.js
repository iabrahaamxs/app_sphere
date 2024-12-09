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
    SELECT f.id, f.post, p."user", p.description, p.created_at, u.name, u.photo, f.created_at AS favorite_created_at
      FROM 
        favorites f
      JOIN 
        posts p ON f.post = p.id
      JOIN 
        users u ON p."user" = u.id
      WHERE 
        f."user" = $1
        AND f.deleted_at IS NULL
      ORDER BY f.created_at DESC`,
    [id]
  );
  return rows;
};

const createFavorite = async (userId, postId) => {
  const { rows } = await poll.query(
    `
    INSERT INTO favorites ("user", post)
      VALUES ($1, $2)
      RETURNING *
    `,
    [userId, postId]
  );

  return rows[0]; 
};

export const FavoriteModel = {
  create,
  getFavorite,
  createFavorite,
};
