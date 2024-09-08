import { FavoriteModel } from "../models/favorites.models.js";
import { PhotoModel } from "../models/photos.models.js";

const getFavorites = async (req, res) => {
  try {
    const id = req.user_id;

    const favorites = await FavoriteModel.getFavorite(id);

    if (!favorites.length > 0) {
      return res
        .status(404)
        .json({ menssage: "User does not have favorites posts" });
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

export const FavoriteController = {
  getFavorites,
};
