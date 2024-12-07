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

  const rows = await PostModel.getPosts(id);

  if (rows.length === 0) {
    return res.json(rows);
  }

  //obtiene las fotos de cada post
  for (let index = 0; index < rows.length; index++) {
    let photos = await PhotoModel.getPhotos(rows[index].id);
    rows[index].photos = photos;
  }

  //obtener comentarios de cada post
  for (let index = 0; index < rows.length; index++) {
    let comments = await CommentModel.getComments(rows[index].id);
    rows[index].comments = comments;
  }

  //obtener likes de cada post
  for (let index = 0; index < rows.length; index++) {
    let likes = await LikeModel.getLikes(rows[index].id);
    rows[index].likes = likes;
  }

  return res.json(rows);
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
    let photos = await PhotoModel.getPhotos(rows[index].id);
    rows[index].photos = photos;
  }

  //obtener comentarios de cada post
  for (let index = 0; index < rows.length; index++) {
    let comments = await CommentModel.getComments(rows[index].id);
    rows[index].comments = comments;
  }

  //obtener likes de cada post
  for (let index = 0; index < rows.length; index++) {
    let likes = await LikeModel.getLikes(rows[index].id);
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
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].id);
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
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].id);
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
      let photos = await PhotoModel.getPhotos(rows[index].id);
      rows[index].photos = photos;
    }

    //obtener comentarios de cada post
    for (let index = 0; index < rows.length; index++) {
      let comments = await CommentModel.getComments(rows[index].id);
      rows[index].comments = comments;
    }

    //obtener likes de cada post
    for (let index = 0; index < rows.length; index++) {
      let likes = await LikeModel.getLikes(rows[index].id);
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

const deletePost = async (req, res) => {
  const { id } = req.params; 

  try {
    // Intentar eliminar el post
    const deletedPost = await PostModel.deletePost(id);

    // Verificar si el post fue realmente eliminado
    if (!deletedPost) {
      return res.status(404).json({ ok: false, message: "Post not found or already deleted" });
    }

    return res.json({ ok: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error); 
    return res.status(500).json({ ok: false, message: "Internal server error" });
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
};
