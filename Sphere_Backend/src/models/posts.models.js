import { poll } from "../db.js";

const create = async (user_id, description) => {
  const { rows } = await poll.query(
    `
    INSERT INTO posts (post_user, description) 
        VALUES ($1, $2) 
        RETURNING *`,
    [user_id, description]
  );
  return rows[0];
};

const getPosts = async (user) => {
  const { rows } = await poll.query(
    `
    SELECT p.post_id, p.post_user, p.description, p.post_created_at, u.name, u.user_photo
      FROM 
        posts p
      JOIN 
        users u ON p.post_user = u.user_id
      WHERE 
        p.post_user = $1
        ORDER BY post_created_at DESC`,
    [user]
  );
  return rows;
};

const getFollowersPosts = async (user_id) => {
  const { rows } = await poll.query(
    `
    SELECT DISTINCT p.post_id, p.post_user, u.user_name, u.name, u.last_name, u.user_photo, p.description, p.post_created_at, p.post_updated_at
      FROM posts p
      JOIN followers f ON p.post_user = f.followed_user
      JOIN users u ON p.post_user = u.user_id
      WHERE f.follower_user = $1
      ORDER BY p.post_created_at DESC;`,
    [user_id]
  );
  return rows;
};

// Buscar los hashtag de los posts
const getPostsTag = async (tag) => {
  const { rows } = await poll.query(
    `
    WITH extracted_hashtags AS (
	    SELECT
	    	LOWER(unnest(regexp_matches(description, '#[a-zA-Z0-9_]+', 'g'))) AS hashtag
	      FROM posts
	      WHERE post_deleted_at IS NULL
    )
      SELECT 
	      hashtag,
	      COUNT(*) AS post_count
          FROM extracted_hashtags
          WHERE hashtag ILIKE $1
          GROUP BY hashtag;`,
    [`#${tag}%`]
  );
  return rows;
};

// Buscar los posts por hashtag
const getPostsByTag = async (tag) => {
  const { rows } = await poll.query(
    `
    SELECT p.post_id, p.post_user, u.user_name, u.name, u.last_name, u.user_photo, p.description, p.post_created_at, p.post_updated_at
      FROM posts p
      JOIN users u ON p.post_user = u.user_id
      WHERE description ~* $1
      AND post_deleted_at IS NULL;
    `,
    [`#\\m${tag}\\M`]
  );
  return rows;
};

// Buscar post por palabras en la descripcion
const getPostsByDescription = async (txt) => {
  const { rows } = await poll.query(
    `SELECT p.post_id, p.post_user, u.user_name, u.name, u.last_name, u.user_photo, p.description, p.post_created_at, p.post_updated_at
      FROM posts p
      JOIN users u ON p.post_user = u.user_id
      WHERE description ~* $1
      AND post_deleted_at IS NULL`,
    [`\\m${txt}\\M`]
  );
  return rows;
};

export const PostModel = {
  create,
  getPosts,
  getFollowersPosts,
  getPostsTag,
  getPostsByTag,
  getPostsByDescription,
};
