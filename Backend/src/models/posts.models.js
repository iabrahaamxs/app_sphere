import { poll } from "../db.js";

const create = async (user_id, description) => {
  const { rows } = await poll.query(
    `
    INSERT INTO posts ("user", description) 
      VALUES ($1, $2) 
      RETURNING *`,
    [user_id, description]
  );
  return rows[0];
};

const getPosts = async (user, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT p.id, 
      p."user", 
      p.description, 
      p.created_at, 
      u.name, 
      u.photo
    FROM posts p
    JOIN users u ON p."user" = u.id
    WHERE p."user" = $1 
      AND p.deleted_at IS NULL
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3`,
    [user, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

const getFollowersPosts = async (user_id, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT DISTINCT p.id, 
      p."user", 
      u.user_name, 
      u.name, 
      u.last_name, 
      u.photo, 
      p.description, 
      p.created_at, 
      p.updated_at
    FROM posts p
    JOIN users u ON p."user" = u.id
    LEFT JOIN followers f ON p."user" = f.followed_user 
      AND f.follower_user = $1 
      AND f.deleted_at IS NULL
    LEFT JOIN (
      SELECT post, COUNT(*) AS like_count
      FROM likes
      GROUP BY post
      HAVING COUNT(*) > 3
    ) l ON p.id = l.post
    WHERE (f.follower_user = $1 OR l.like_count > 3)
      AND p.deleted_at IS NULL
    ORDER BY p.created_at DESC
    LIMIT $2 OFFSET $3`,
    [user_id, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

// Buscar los hashtag de los posts
const getPostsTag = async (tag, limit, offset) => {
  const { rows } = await poll.query(
    `
    WITH extracted_hashtags AS (
	    SELECT
	    	LOWER(unnest(regexp_matches(description, '#[a-zA-Z0-9_]+', 'g'))) AS hashtag
	      FROM posts
	      WHERE deleted_at IS NULL
    )
      SELECT 
	      hashtag,
	      COUNT(*) AS post_count
          FROM extracted_hashtags
          WHERE hashtag ILIKE $1
          GROUP BY hashtag
          LIMIT $2 OFFSET $3;`,
    [`#${tag}%`, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

// Buscar los posts por hashtag
const getPostsByTag = async (tag, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT p.id, 
      p."user", 
      u.user_name, 
      u.name, 
      u.last_name, 
      u.photo, 
      p.description, 
      p.created_at, 
      p.updated_at
    FROM posts p
    JOIN users u ON p."user" = u.id
    WHERE p.description ~* $1 
      AND p.deleted_at IS NULL
      LIMIT $2 OFFSET $3;`,
    [`#\\m${tag}\\M`, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

// Buscar post por palabras en la descripcion
const getPostsByDescription = async (txt, limit, offset) => {
  const { rows } = await poll.query(
    `
    SELECT p.id, 
      p."user", 
      u.user_name, 
      u.name, 
      u.last_name, 
      u.photo, 
      p.description, 
      p.created_at, 
      p.updated_at
    FROM posts p
    JOIN users u ON p."user" = u.id
    WHERE p.description ~* $1 
      AND p.deleted_at IS NULL
      LIMIT $2 OFFSET $3;`,
    [`${txt}`, parseInt(limit), parseInt(offset)]
  );
  return rows;
};

const deletePost = async (post_id) => {
  const { rows } = await poll.query(
    `
  UPDATE posts
  SET deleted_at = CURRENT_TIMESTAMP
  WHERE id = $1
  RETURNING *;
  `,
    [post_id]
  );
  return rows[0];
};

const updateDescription = async (post_id, description) => {
  const { rows } = await poll.query(
    `
    UPDATE posts
    SET description = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2 AND deleted_at IS NULL
    RETURNING *;
    `,
    [description, post_id]
  );
  return rows[0];
};

export const PostModel = {
  create,
  getPosts,
  getFollowersPosts,
  getPostsTag,
  getPostsByTag,
  getPostsByDescription,
  deletePost,
  updateDescription,
};
