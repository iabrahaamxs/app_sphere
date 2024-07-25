import { poll } from "../db.js";

const getFollowed = async (id) => {
  const { rows } = await poll.query(
    "SELECT followers.follow_id, followers.follower_user, users.user_name, followers.follow_created_at, followers.follow_deleted_at FROM followers JOIN users ON followers.followed_user = users.user_id WHERE follower_user = $1 AND follow_deleted_at IS NULL",
    [id]
  );

  return rows;
};

export const FollowModel = {
  getFollowed,
};
