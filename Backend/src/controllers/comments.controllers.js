import { CommentModel } from "../models/comments.models.js";

const getComments = async (req, res) => {
  const { post, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const comments = await CommentModel.getComments(post, limit, offset);

    return res.json(comments);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const countComments = async (req, res) => {
  const { post } = req.query;

  try {
    const count = await CommentModel.countComments(post);

    return res.json(count);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const createComment = async (req, res) => {
  const user = req.user_id;
  const { post, text } = req.body;

  try {
    const comment = await CommentModel.createComments(user, post, text);

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const CommentController = {
  getComments,
  countComments,
  createComment,
};
