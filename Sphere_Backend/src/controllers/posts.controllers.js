import { poll } from "../db.js";
import { PhotoModel } from "../models/photos.models.js"; //test
import { CommentModel } from "../models/comments.models.js";
import { LikeModel } from "../models/likes.models.js";

export const createPost = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await poll.query(
      "INSERT INTO posts (post_user, description) VALUES ($1, $2) RETURNING *",
      [data.post_user, data.description]
    );
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// obtener posts de un usuario con sus respectivas fotos
export const getPosts = async (req, res) => {
  const user = req.user_id;
  const { rows } = await poll.query(
    "SELECT * FROM posts WHERE post_user = $1",
    [user]
  );

  if (rows.length === 0) {
    return res.status(404).json({ menssage: "User without post" });
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
