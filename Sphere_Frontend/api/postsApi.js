import axiosManager from "./apiManager";

const getPosts = async (id) => {
  try {
    const res = await axiosManager.get(`/posts/${id}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPosts" }');

    return [];
  }
};

const getFavorites = async (jwt) => {
  try {
    const res = await axiosManager.get("/favorites", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFavorites" }');

    return [];
  }
};

const getFollowersPosts = async (jwt) => {
  try {
    const res = await axiosManager.get("/followersposts", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFollowersPosts" }');

    return [];
  }
};

export const PostApi = {
  getPosts,
  getFavorites,
  getFollowersPosts,
};
