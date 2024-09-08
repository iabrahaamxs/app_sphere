import { FollowModel } from "../models/follows.models.js";

/*export const getFollows = async (req, res) => {
    console.log("hola munod");
    const { rows } = await poll.query(
      "SELECT followers.follow_id, follower_name.name AS follower, followed_name.name AS followed, followers.follow_created_at, followers.follow_deleted_at FROM users AS follower_name JOIN followers ON follower_name.user_id = followers.follower_user JOIN users AS followed_name ON followed_name.user_id = followers.followed_user;"
    );
    
    res.json(rows);
  };*/

// personas que sigue un usuario
const getFollowed = async (req, res) => {
  const id = req.user_id;

  const users = await FollowModel.getFollowed(id);

  if (!users.length > 0) {
    return res.status(404).json({ menssage: "User does not have followed" });
  }

  res.json(users);
};

// personas que siguen a un usuario
export const getfollowers = async (req, res) => {
  const id = req.user_id;

  const followers = await FollowModel.getfollowers(id);

  if (followers.length === 0) {
    return res.status(404).json({ menssage: "User without followers" });
  }

  res.json(followers);
};

// crear seguidor
export const createFollower = async (req, res) => {
  try {
    const data = req.body;

    const follower = await FollowModel.follow(data);

    return res.json(follower);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// dejar de seguir a usuario
export const deleteFollower = async (req, res) => {
  const data = req.body;

  try {
    const unfollower = await FollowModel.unfollowfollow(data);

    return res.json(unfollower);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const FollowController = {
  getFollowed,
  getfollowers,
  createFollower,
  deleteFollower,
};
