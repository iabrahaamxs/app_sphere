import { LikeModel } from "../models/likes.models.js";

const getLikes = async (req, res) => {
  const { post } = req.query;

  try {
    const likes = await LikeModel.getLikes(post);

    return res.json(likes);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const countLikes = async (req, res) => {
  const { post } = req.query;

  try {
    const count = await LikeModel.countLikes(post);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const createLike = async (req, res) => {
  const user = req.user_id;
  const { post } = req.body;

  try {
    const like = await LikeModel.createLike(user, post);

    return res.json(like);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const deleteLike = async (req, res) => {
  const user = req.user_id;
  const { post } = req.body;

  try {
    const like = await LikeModel.deleteLike(user, post);

    return res.json(like);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const LikeController = {
  getLikes,
  countLikes,
  createLike,
  deleteLike,
};
