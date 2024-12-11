import { poll } from "../db.js";

const getLikes = async (post_id, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT 
      l.id,
      l.created_at,
      u.id AS user_id,
      u.name,
      u.last_name,
      u.photo,
      u.user_name
        FROM likes l
        JOIN users u ON l."user" = u.id
        WHERE l.post = $1
        AND l.deleted_at IS NULL
        LIMIT $2 OFFSET $3`,
    [post_id, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

const countLikes = async (post) => {
  const { rows } = await poll.query(
    `
    SELECT 
    COUNT(*) AS likes_count
      FROM likes
      WHERE post = $1
      AND deleted_at IS NULL`,
    [post]
  );
  return rows[0];
};

const createLike = async (user, post) => {
  const { rows } = await poll.query(
    `INSERT INTO likes ("user", post)
      VALUES ($1, $2)
      RETURNING *`,
    [user, post]
  );
  return rows[0];
};

const deleteLike = async (user, post) => {
  const { rows } = await poll.query(
    `UPDATE likes
      SET deleted_at = CURRENT_TIMESTAMP
        WHERE "user" = $1
        AND post = $2
        AND deleted_at IS NULL
      RETURNING *`,
    [user, post]
  );
  return rows[0];
};

const findLike = async (user, post) => {
  const { rows } = await poll.query(
    `SELECT * 
      FROM likes
      WHERE "user" = $1 
        AND post = $2
        AND deleted_at IS NULL`,
    [user, post]
  );
  return rows.length > 0;
};

export const LikeModel = {
  getLikes,
  countLikes,
  createLike,
  deleteLike,
  findLike,
};
