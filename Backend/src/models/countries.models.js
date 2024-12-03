import { poll } from "../db.js";

export const countries = async () => {
  const { rows } = await poll.query(`SELECT * FROM countries`);

  return rows;
};
