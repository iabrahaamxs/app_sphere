import axiosManager from "./apiManager";

const create = async (data, jwt) => {
  try {
    const res = await axiosManager.post("/private/categorie/categories", data, {
      headers: {
        Authorization: jwt,
      },
    });

    return res.data;
  } catch (error) {
    //console.log(error);
    return { msg: "error" };
  }
};

const getCategories = async (id) => {
  const template = [
    { value: 1, icon: "hand-rock", name: "Acción" },
    { value: 2, icon: "heart-pulse", name: "Aventura" },
    { value: 3, icon: "compass", name: "Arcade" },
    { value: 4, icon: "soccer-ball", name: "Deporte" },
    { value: 5, icon: "lightbulb", name: "Estrategia" },
    { value: 6, icon: "explosion", name: "Simulación" },
    { value: 7, icon: "chess-knight", name: "Mesa" },
    { value: 8, icon: "guitar", name: "Musicales" },
  ];

  try {
    const res = await axiosManager.get(`/public/categorie/categories/${id}`);

    const categories = res.data.map((r) => {
      const match = template.find((t) => t.value === r.categorie);

      return match ? match : null;
    });

    return categories;
  } catch (error) {
    console.log('{ msg: "error getcategories" }');

    return [];
  }
};

const getMyCategories = async (jwt) => {
  const template = [
    { value: 1, icon: "hand-rock", name: "Acción" },
    { value: 2, icon: "heart-pulse", name: "Aventura" },
    { value: 3, icon: "compass", name: "Arcade" },
    { value: 4, icon: "soccer-ball", name: "Deporte" },
    { value: 5, icon: "lightbulb", name: "Estrategia" },
    { value: 6, icon: "explosion", name: "Simulación" },
    { value: 7, icon: "chess-knight", name: "Mesa" },
    { value: 8, icon: "guitar", name: "Musicales" },
  ];

  try {
    const res = await axiosManager.get("/private/categorie/categories", {
      headers: {
        Authorization: jwt,
      },
    });

    const categories = res.data.map((r) => {
      const match = template.find((t) => t.value === r.categorie);

      return match ? match : null;
    });

    return categories;
  } catch (error) {
    console.log('{ msg: "error getMyCategories" }');

    return [];
  }
};

export const CategorieApi = {
  create,
  getCategories,
  getMyCategories,
};
