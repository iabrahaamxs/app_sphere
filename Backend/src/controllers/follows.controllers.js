import { FollowModel } from "../models/follows.models.js";

// personas que sigue un usuario
const getFollowed = async (req, res) => {
  const id = req.user_id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const users = await FollowModel.getFollowed(id, limit, offset);

  res.json(users);
};

// personas que siguen a un usuario
const getfollowers = async (req, res) => {
  const id = req.user_id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const followers = await FollowModel.getfollowers(id, limit, offset);

  res.json(followers);
};

// crear seguidor
const createFollower = async (req, res) => {
  const id = req.user_id;
  const { followed } = req.body;

  try {
    const newFollower = await FollowModel.follow(id, followed);

    return res.json(newFollower);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// dejar de seguir a usuario
const deleteFollower = async (req, res) => {
  const id = req.user_id;
  const { followed } = req.body;

  try {
    const unfollower = await FollowModel.unfollow(id, followed);

    return res.json(unfollower);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const isFollowed = async (req, res) => {
  const id = req.user_id;
  const { followed } = req.query;

  try {
    const follow = await FollowModel.isFollowed(id, followed);

    return res.json(follow);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar mis seguidores
const countMyFollowers = async (req, res) => {
  const id = req.user_id;

  try {
    const count = await FollowModel.countFollowers(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar mis seguidos
const countMyFollowed = async (req, res) => {
  const id = req.user_id;

  try {
    const count = await FollowModel.countFollowed(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar seguidores de usuarios
const countFollowers = async (req, res) => {
  const { id } = req.params;

  try {
    const count = await FollowModel.countFollowers(id);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// contar seguidos de usuarios
const countFollowed = async (req, res) => {
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
  isFollowed,
  countMyFollowed,
  countMyFollowers,
};
