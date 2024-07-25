import { poll } from "../db.js";

const getPhotos = async (post_id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM photos 
        WHERE post = $1`,
    [post_id]
  );
  return rows
};

export const PhotoModel = {
    getPhotos
}
