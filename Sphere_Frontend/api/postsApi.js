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

const getHashtags = async (tag) => {
  try {
    const res = await axiosManager.get(`/search/hashtag/${tag}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getHashtags" }');

    return [];
  }
};

const getPostsByTag = async (tag) => {
  try {
    const res = await axiosManager.get(`/search/hashtag/posts/${tag}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByTag" }');

    return [];
  }
};

const getPostsByDescription = async (txt) => {
  try {
    const res = await axiosManager.get(`/search/posts/${txt}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByDescription" }');

    return [];
  }
};

export const PostApi = {
  getPosts,
  getFavorites,
  getFollowersPosts,
  getHashtags,
  getPostsByTag,
  getPostsByDescription,
};
