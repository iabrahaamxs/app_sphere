import { poll } from "../db.js";

const create = async (user_id, categorie) => {
  const { rows } = await poll.query(
    `
      INSERT INTO users_categories ("user", categorie)
        VALUES ($1, $2)
	      RETURNING *`,
    [user_id, categorie]
  );
  return rows[0];
};

const getCategories = async (user_id) => {
  const { rows } = await poll.query(
    `
    SELECT * FROM users_categories 
      WHERE "user" = $1 
      AND deleted_at IS NULL
      ORDER BY categorie`,
    [user_id]
  );
  return rows;
};

const findCategorie = async (user_id, categorieOn) => {
  const { rows } = await poll.query(
    `
      SELECT * FROM users_categories 
        WHERE "user" = $1
        AND categorie = $2
        AND deleted_at IS NULL`,
    [user_id, categorieOn]
  );
  return rows[0];
};

const update = async (user_id, categorieOff) => {
  const { rows } = await poll.query(
    `
    UPDATE users_categories
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE "user" = $1
      AND categorie = $2
      AND deleted_at IS NULL
      RETURNING *`,
    [user_id, categorieOff]
  );

  return rows[0];
};

export const CategorieModel = {
  create,
  getCategories,
  findCategorie,
  update,
};
