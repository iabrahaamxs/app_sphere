import { FavoriteModel } from "../models/favorites.models.js";
import { PhotoModel } from "../models/photos.models.js";

const getFavorites = async (req, res) => {
  try {
    const id = req.user_id;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const favorites = await FavoriteModel.getFavorite(id, limit, offset);

    if (!favorites.length > 0) {
      return res.json(favorites);
    }

    //obtiene las fotos de cada post
    for (let index = 0; index < favorites.length; index++) {
      let photos = await PhotoModel.getPhotos(favorites[index].post);
      favorites[index].photos = photos;
    }

    return res.json(favorites);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

const addFavorite = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user_id; // Obtener el userId desde la autenticación

  if (!postId) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  try {
    const favorite = await FavoriteModel.createFavorite(userId, postId);

    return res.status(201).json({
      ok: true,
      message: "Favorite created successfully",
      favorite,
    });
  } catch (error) {
    console.error("Error creating favorite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const isFavorite = async (req, res) => {
  const user = req.user_id;
  const { post } = req.query;

  try {
    const isFavorited = await FavoriteModel.findFavorite(user, post);

    return res.json({ isFavorited });
  } catch (error) {
    console.error("Error en isFavorite:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFavorite = async (req, res) => {
  const user = req.user_id;
  const { postId } = req.body;

  try {
    const result = await FavoriteModel.deleteFavorite(user, postId);

    if (result) {
      return res.status(200).json({ message: "Favorite removed successfully" });
    } else {
      return res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const FavoriteController = {
  getFavorites,
  addFavorite,
  isFavorite,
  deleteFavorite,
};
