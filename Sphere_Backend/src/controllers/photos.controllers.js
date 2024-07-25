import { PhotoModel } from "../models/photos.models.js";

const getPhotos = async (req, res) => {
  try {
    const data = req.body;

    const photos = await PhotoModel.getPhotos(data.post_id);

    if (photos.length < 1) {
        return res.json({menssage: "post without photos"})
        
    }

    return res.json(photos);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const PhotoController = {
  getPhotos,
};
