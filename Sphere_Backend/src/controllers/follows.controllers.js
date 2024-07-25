import { poll } from "../db.js";

/*export const getFollows = async (req, res) => {
    console.log("hola munod");
    const { rows } = await poll.query(
      "SELECT followers.follow_id, follower_name.name AS follower, followed_name.name AS followed, followers.follow_created_at, followers.follow_deleted_at FROM users AS follower_name JOIN followers ON follower_name.user_id = followers.follower_user JOIN users AS followed_name ON followed_name.user_id = followers.followed_user;"
    );
    
    res.json(rows);
  };*/

// personas que sigue un usuario
export const getfollowed = async (req, res) => {
  const { id } = req.params;
  const { rows } = await poll.query(
    "SELECT followers.follow_id, followers.follower_user, users.user_name, followers.follow_created_at, followers.follow_deleted_at FROM followers JOIN users ON followers.followed_user = users.user_id WHERE follower_user = $1 AND follow_deleted_at IS NULL",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ menssage: "User does not have followed" });
  }

  res.json(rows);
};

// personas que siguen a un usuario
export const getfollowers = async (req, res) => {
  const { id } = req.params;
  const { rows } = await poll.query(
    "SELECT followers.follow_id, users.user_name, followers.followed_user, followers.follow_created_at, followers.follow_deleted_at FROM followers JOIN users ON followers.follower_user = users.user_id WHERE followed_user = $1 AND follow_deleted_at IS NULL",
    [id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ menssage: "User without followers" });
  }

  res.json(rows);
};

// crear seguidor
export const createFollower = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await poll.query(
      "INSERT INTO followers (follower_user, followed_user) VALUES ($1, $2) RETURNING *",
      [data.follower_user, data.followed_user]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

// dejar de seguir a usuario
export const deleteFollower = async (req, res) => {
  const data = req.body;

  const { rows } = await poll.query(
    "UPDATE followers SET follow_deleted_at = CURRENT_TIMESTAMP WHERE follower_user = $1 AND followed_user = $2 AND follow_deleted_at IS NULL RETURNING *",
    [data.follower_user, data.followed_user]
  );
  return res.json(rows);
};
