import { poll } from "../db.js";

const getLikes = async (post_id) => {
  const { rows } = await poll.query(
    `
      SELECT * FROM likes 
        WHERE post = $1`,
    [post_id]
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

export const LikeModel = {
  getLikes,
  countLikes,
  createLike,
  deleteLike,
};
