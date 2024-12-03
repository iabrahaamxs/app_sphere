import { poll } from "../db.js";

const getLikes = async (post_id) => {
    const { rows } = await poll.query(
      `
      SELECT * FROM likes 
        WHERE post = $1`,
      [post_id]
    );
    return rows
  };

export const LikeModel = {
    getLikes
    
}