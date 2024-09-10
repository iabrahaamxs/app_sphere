import { jwtVerify } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";
import { CategorieModel } from "../models/categories.models.js";

const createUserCategorie = async (req, res) => {
  const { authorization } = req.headers;
  const data = req.body;
  const rows = [];

  if (!authorization)
    return res.status(401).json({ message: "Token not provided" });

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(JWT_PRIVATE_KEY)
    );

    data.user_id = payload.user_id;

    if (data.categories < 1) {
      return res.json({ menssage: "User without categories" });
    }

    for (let index = 0; index < data.categories.length; index++) {
      const categorie = await CategorieModel.create(
        data.user_id,
        data.categories[index]
      );
      rows[index] = categorie;
    }

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ menssage: "Internal server error" }); 
  }
};
 
const getCategories = async (req, res) => {
  const { userid } = req.params;

  const categories = await CategorieModel.getCategories(userid);

  if (categories.length === 0) {
    return res.status(404).json({ menssage: "User without categories" });
  }

  res.json(categories);
};

const updateCategories = async (req, res) => {
  try {
    const data = req.body;

    // insertar categorias si no existen
    for (let i = 0; i < data.categoriesOn.length; i++) {
      const categorie = await CategorieModel.findCategorie(
        data.user_id,
        data.categoriesOn[i]
      );
      if (!categorie) {
        CategorieModel.create(data.user_id, data.categoriesOn[i]);
      }
    }

    // eliminar categorias si existen
    for (let i = 0; i < data.categoriesOff.length; i++) {
      CategorieModel.update(data.user_id, data.categoriesOff[i]);
    }

    const categories = await CategorieModel.getCategories(data.user_id);

    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const CategorieController = {
  createUserCategorie,
  getCategories,
  updateCategories,
};
