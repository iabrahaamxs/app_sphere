import { FollowModel } from "../models/follows.models.js";

// personas que sigue un usuario
const getFollowed = async (req, res) => {
  const id = req.user_id;

  const users = await FollowModel.getFollowed(id);

  res.json(users);
};

// personas que siguen a un usuario
export const getfollowers = async (req, res) => {
  const id = req.user_id;

  const followers = await FollowModel.getfollowers(id);

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

// contar mis seguidores
export const countMyFollowers = async (req, res) => {
  const id = req.user_id;

  try {
    const count = await FollowModel.countFollowers(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar mis seguidos
export const countMyFollowed = async (req, res) => {
  const id = req.user_id;

  try {
    const count = await FollowModel.countFollowed(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar seguidores de usuarios
export const countFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await FollowModel.countFollowers(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar seguidos de usuarios
export const countFollowed = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await FollowModel.countFollowed(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const FollowController = {
  getFollowed,
  getfollowers,
  createFollower,
  deleteFollower,
  countFollowed,
  countFollowers,
  countMyFollowed,
  countMyFollowers,
};
