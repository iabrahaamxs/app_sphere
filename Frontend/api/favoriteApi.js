import axiosManager from "./apiManager";

const addFavorite = async (jwt, postId) => {
  try {
    const res = await axiosManager.post(
      "/private/favorite/addfavorite",
      { postId },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('{ msg: "error addFavorite" }', error);
    return {
      ok: false,
      message: error.response?.data?.message || "Error adding favorite",
    };
  }
};

const isFavorite = async (jwt, postId) => {
  try {
    const res = await axiosManager.get("/private/favorite/isfavorited", {
      params: { post: postId },
      headers: {
        Authorization: jwt,
      },
    });
    return { ok: true, isFavorited: res.data.isFavorited };
  } catch (error) {
    console.log('{ msg: "error isFavorite" }', error);
    return {
      ok: false,
      message: error.response?.data?.message || "Error checking favorite status",
    };
  }
};

const deleteFavorite = async (jwt, postId) => {
  try {
    const res = await axiosManager.put(
      "/private/favorite/deletefavorite",
      { postId },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('{ msg: "error deleteFavorite" }', error);
    return {
      ok: false,
      message: error.response?.data?.message || "Error deleting favorite",
    };
  }
};

export const FavoriteApi = {
  addFavorite,
  isFavorite,
  deleteFavorite,
};
