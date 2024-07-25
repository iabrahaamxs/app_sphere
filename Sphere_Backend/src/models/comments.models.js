import { poll } from "../db.js";

const getComments = async (post_id) => {
    const { rows } = await poll.query(
      `
      SELECT * FROM comments 
        WHERE post = $1`,
      [post_id]
    );
    return rows
  };

export const CommentModel = {
    getComments
    
}