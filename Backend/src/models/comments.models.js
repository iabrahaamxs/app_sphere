import { poll } from "../db.js";

const getComments = async (post_id) => {
  const { rows } = await poll.query(
    `
    SELECT c.id,
      u.user_name,
      u.photo,
      c.text,
      c.created_at
        FROM comments AS c
        INNER JOIN users AS u ON c."user" = u.id
        WHERE c.post = $1
        AND c.deleted_at IS NULL`,
    [post_id]
  );
  return rows;
};

const countComments = async (post) => {
  const { rows } = await poll.query(
    `
    SELECT 
    COUNT(*) AS comments_count
      FROM comments
      WHERE post = $1
      AND deleted_at IS NULL`,
    [post]
  );
  return rows[0];
};

const createComments = async (user, post, text) => {
  const { rows } = await poll.query(
    `INSERT INTO comments ("user", post, text)
      VALUES ($1, $2, $3)
      RETURNING *`,
    [user, post, text]
  );
  return rows[0];
};

export const CommentModel = {
  getComments,
  countComments,
  createComments,
};
