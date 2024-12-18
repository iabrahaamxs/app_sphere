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

  res.json(categories);
};

const getMyCategories = async (req, res) => {
  const userid = req.user_id;

  const categories = await CategorieModel.getCategories(userid);

  res.json(categories);
};

const updateCategories = async (req, res) => {
  const userid = req.user_id;
  const data = req.body;

  try {
    // insertar categorias si no existen
    for (let i = 0; i < data.categoriesOn.length; i++) {
      const categorie = await CategorieModel.findCategorie(
        userid,
        data.categoriesOn[i]
      );
      if (!categorie) {
        await CategorieModel.create(userid, data.categoriesOn[i]);
      }
    }

    // eliminar categorias si existen
    for (let i = 0; i < data.categoriesOff.length; i++) {
      await CategorieModel.update(userid, data.categoriesOff[i]);
    }

    const categories = await CategorieModel.getCategories(userid);

    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ menssage: "Internal server error" });
  }
};

export const CategorieController = {
  getCategories,
  getMyCategories,
  createUserCategorie,
  updateCategories,
};
