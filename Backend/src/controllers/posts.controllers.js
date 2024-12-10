import { PhotoModel } from "../models/photos.models.js"; //test
import { PostModel } from "../models/posts.models.js";
import { CommentModel } from "../models/comments.models.js";
import { LikeModel } from "../models/likes.models.js";

const createPost = async (req, res) => {
  const data = req.body;
  const id = req.user_id;
  try {
    const rows = await PostModel.create(id, data.description);

    const photo = await PhotoModel.create(rows.id, data.photo);

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

//obtener mis posts
const getMyPosts = async (req, res) => {
  const id = req.user_id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const rows = await PostModel.getPosts(id, limit, offset);

  if (rows.length === 0) {
    return res.json(rows);
  }

  //obtiene las fotos de cada post
  for (let index = 0; index < rows.length; index++) {
    let photos = await PhotoModel.getPhotos(rows[index].id);
    rows[index].photos = photos;
  }

  return res.json(rows);
};

// obtener posts de un usuario con sus respectivas fotos
const getPosts = async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const rows = await PostModel.getPosts(id, limit, offset);

  if (rows.length === 0) {
    return res.json(rows);
  }

  //obtiene las fotos de cada post
  for (let index = 0; index < rows.length; index++) {
    let photos = await PhotoModel.getPhotos(rows[index].id);
    rows[index].photos = photos;
  }

  return res.json(rows);
};

const getFollowersPosts = async (req, res) => {
  const user = req.user_id;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const rows = await PostModel.getFollowersPosts(user, limit, offset);

    if (rows.length === 0) {
      return res.status(404).json({ menssage: "no posts to view" });
    }

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
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
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const rows = await PostModel.getPostsTag(tag, limit, offset);

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
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const rows = await PostModel.getPostsByTag(tag, limit, offset);

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
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
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const rows = await PostModel.getPostsByDescription(txt, limit, offset);

    //obtiene las fotos de cada post
    for (let index = 0; index < rows.length; index++) {
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
    }

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      menssage: "ERROR SERVER",
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.body;

  try {
    // Intentar eliminar el post
    const deletedPost = await PostModel.deletePost(id);

    // Verificar si el post fue realmente eliminado
    if (!deletedPost) {
      return res
        .status(404)
        .json({ ok: false, message: "Post not found or already deleted" });
    }

    return res.json({ ok: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

const updatePost = async (req, res) => {
  const { id, description } = req.body;

  if (!description) {
    return res
      .status(400)
      .json({ ok: false, message: "Description is required" });
  }

  try {
    const updatedPost = await PostModel.updateDescription(id, description);

    if (!updatedPost) {
      return res
        .status(404)
        .json({ ok: false, message: "Post not found or already deleted" });
    }

    return res.json({ ok: true, post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const PostController = {
  createPost,
  getPosts,
  getMyPosts,
  getFollowersPosts,
  searchTagPosts,
  searchPostsByTag,
  searchPostsByDescription,
  deletePost,
  updatePost,
};
