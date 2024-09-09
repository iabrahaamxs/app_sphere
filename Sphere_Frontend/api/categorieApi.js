import axiosManager from "./apiManager";

const create = async (data, jwt) => {
  try {
    const res = await axiosManager.post("/categorie", data, {
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
    const res = await axiosManager.get(`/categorie/${id}`);

    const categories = res.data.map((r) => {
      const match = template.find((t) => t.value === r.categorie);

      return match ? match : null;
    });

    return categories;
  } catch (error) {
    return { msg: "error getcategories" };
  }
};

export const CategorieApi = {
  create,
  getCategories,
};
