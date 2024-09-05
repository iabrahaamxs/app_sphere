import { poll } from "../db.js";

const getFollowed = async (id) => {
  const { rows } = await poll.query(
    "SELECT followers.follow_id, followers.follower_user, users.user_name, followers.follow_created_at, followers.follow_deleted_at FROM followers JOIN users ON followers.followed_user = users.user_id WHERE follower_user = $1 AND follow_deleted_at IS NULL",
    [id]
  );

  return rows;
};

const getfollowers = async (id) => {
  const { rows } = await poll.query(
    "SELECT followers.follow_id, users.user_name, followers.followed_user, followers.follow_created_at, followers.follow_deleted_at FROM followers JOIN users ON followers.follower_user = users.user_id WHERE followed_user = $1 AND follow_deleted_at IS NULL",
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
    "UPDATE followers SET follow_deleted_at = CURRENT_TIMESTAMP WHERE follower_user = $1 AND followed_user = $2 AND follow_deleted_at IS NULL RETURNING *",
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
