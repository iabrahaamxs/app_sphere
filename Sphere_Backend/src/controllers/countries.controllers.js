import { countries } from "../models/countries.models.js";

export const getCountries = async (req, res) => {
  try {
    const rows = await countries();

    return res.json(rows);
  } catch (error) {
    return res.status(404).json({ menssage: "Error" });
  }
};
