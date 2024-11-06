import { poll } from "../db.js";

const getFollowed = async (id) => {
  const { rows } = await poll.query(
    `SELECT f.id, 
       f.follower_user, 
       u.name, 
       u.last_name, 
       u.id AS user_id, 
       u.user_name, 
       u.photo, 
       f.created_at, 
       f.deleted_at
        FROM followers f
        JOIN users u ON f.followed_user = u.id
        WHERE f.follower_user = $1
        AND f.deleted_at IS NULL`,
    [id]
  );

  return rows;
};

const getfollowers = async (id) => {
  const { rows } = await poll.query(
    `SELECT f.id, 
       u.id AS user_id, 
       u.name, 
       u.last_name, 
       u.user_name, 
       u.photo, 
       f.followed_user, 
       f.created_at, 
       f.deleted_at
        FROM followers f
        JOIN users u ON f.follower_user = u.id
        WHERE f.followed_user = $1
        AND f.deleted_at IS NULL`,
    [id]
  );
  return rows;
};

const follow = async (data) => {
  const { rows } = await poll.query(
    "INSERT INTO followers (follower_user, followed_user) VALUES ($1, $2) RETURNING *",
    [data.follower_user, data.followed_user]
  );
  return rows;
};

const unfollow = async (data) => {
  const { rows } = await poll.query(
    `UPDATE followers 
        SET deleted_at = CURRENT_TIMESTAMP 
        WHERE follower_user = $1 
        AND followed_user = $2 
        AND deleted_at IS NULL 
        RETURNING *`,
    [data.follower_user, data.followed_user]
  );
  return rows;
};

export const FollowModel = {
  getFollowed,
  getfollowers,
  follow,
  unfollow,
};
