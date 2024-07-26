import { poll } from "../db.js";
import { CategorieModel } from "../models/categories.models.js";

const createUserCategorie = async (req, res) => {
  try {
    const data = req.body;
    const rows = [];

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
  const { id } = req.params;

  const categories = await CategorieModel.getCategories(id);

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
