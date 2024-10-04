import { PhotoModel } from "../models/photos.models.js"; //test
import { PostModel } from "../models/posts.models.js";
import { CommentModel } from "../models/comments.models.js";
import { LikeModel } from "../models/likes.models.js";

const createPost = async (req, res) => {
  try {
    const data = req.body;

    const rows = await PostModel.create(data.post_user, data.description);

    const photo = await PhotoModel.create(rows.post_id, data.photo);

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// obtener posts de un usuario con sus respectivas fotos
const getPosts = async (req, res) => {
  const { id } = req.params;

  const rows = await PostModel.getPosts(id);

  if (rows.length === 0) {
    return res.json(rows);
  }

  //obtiene las fotos de cada post
  for (let index = 0; index < rows.length; index++) {
    let photos = await PhotoModel.getPhotos(rows[index].post_id);
    rows[index].photos = photos;
  }

  //obtener comentarios de cada post
  for (let index = 0; index < rows.length; index++) {
    let comments = await CommentModel.getComments(rows[index].post_id);
    rows[index].comments = comments;
  }

  //obtener likes de cada post
  for (let index = 0; index < rows.length; index++) {
    let likes = await LikeModel.getLikes(rows[index].post_id);
    rows[index].likes = likes;
  }

  return res.json(rows);
};

const getFollowersPosts = async (req, res) => {
  const user = req.user_id;

  try {
    const rows = await PostModel.getFollowersPosts(user);

    if (rows.length === 0) {
      return res.status(404).json({ menssage: "no posts to view" });
    }

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].post_id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].post_id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].post_id);
      rows[index].likes = likes;
    }

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const searchTagPosts = async (req, res) => {
  const { tag } = req.params;

  try {
    const rows = await PostModel.getPostsTag(tag);

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const searchPostsByTag = async (req, res) => {
  const { tag } = req.params;

  try {
    const rows = await PostModel.getPostsByTag(tag);

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].post_id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].post_id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].post_id);
      rows[index].likes = likes;
    }

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const searchPostsByDescription = async (req, res) => {
  const { txt } = req.params;

  try {
    const rows = await PostModel.getPostsByDescription(txt);

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].post_id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].post_id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].post_id);
      rows[index].likes = likes;
    }

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

export const PostController = {
  createPost,
  getPosts,
  getFollowersPosts,
  searchTagPosts,
  searchPostsByTag,
  searchPostsByDescription,
};
