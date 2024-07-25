import { poll } from "../db.js";

export const createUserCategorie = async (req, res) => {
    
  try {
    const data = req.body;
    
    const { rows } = await poll.query(
      "INSERT INTO users_categories (u_c_user, categorie) VALUES ($1, $2) RETURNING *",
      [data.user, data.categorie]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  const { id } = req.params;
  const { rows } = await poll.query("SELECT * FROM users_categories WHERE u_c_user = $1", [
    id,
  ]);

  if (rows.length === 0) {
    return res.status(404).json({ menssage: "User without categories" });
  }

  res.json(rows);
};

