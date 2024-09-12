import { poll } from "../db.js";

const create = async (user_id, description) => {
  const { rows } = await poll.query(
    `
    INSERT INTO posts (post_user, description) 
        VALUES ($1, $2) 
        RETURNING *`,
    [user_id, description]
  );
  return rows[0];
};

const getPosts = async (user) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM posts 
        WHERE post_user = $1
        ORDER BY post_created_at DESC`,
    [user]
  );
  return rows;
};

const getFollowersPosts = async (user_id) => {
  const { rows } = await poll.query(
    `
    SELECT p.post_id, p.post_user, u.user_name, u.name, u.last_name, u.user_photo, p.description, p.post_created_at, p.post_updated_at
      FROM posts p
      JOIN followers f ON p.post_user = f.followed_user
      JOIN users u ON p.post_user = u.user_id
      WHERE f.follower_user = $1
      ORDER BY p.post_created_at DESC;`,
    [user_id]
  );
  return rows;
};

export const PostModel = {
  create,
  getPosts,
  getFollowersPosts,
};
