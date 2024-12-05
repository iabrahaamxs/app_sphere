import axiosManager from "./apiManager";

const getLikes = async (jwt, post) => {
  try {
    const { data } = await axiosManager.get("/private/like/likes", {
      headers: {
        Authorization: jwt,
      },
      params: {
        post,
      },
    });
    return data;
  } catch (error) {
    console.log("error getLikes");
    return;
  }
};

const count = async (jwt, post) => {
  try {
    const { data } = await axiosManager.get("/private/like/count", {
      headers: {
        Authorization: jwt,
      },
      params: {
        post,
      },
    });
    return data;
  } catch (error) {
    console.log("error count");
    return;
  }
};

const createLike = async (jwt, post) => {
  try {
    const { data } = await axiosManager.post(
      "/private/like/create",
      { post },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error createLike");
    return;
  }
};

const deleteLike = async (jwt, post) => {
  try {
    const { data } = await axiosManager.put(
      "/private/like/delete",
      { post },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error deleteLike");
    return;
  }
};

export const LikeApi = {
  getLikes,
  count,
  createLike,
  deleteLike,
};
