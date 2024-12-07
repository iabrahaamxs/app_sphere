import axiosManager from "./apiManager";

const create = async (jwt, description, photo) => {
  try {
    const res = await axiosManager.post(
      "/private/post/posts",
      {
        description,
        photo,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
  } catch (error) {
    console.log("error createPost");
  }
};

const getPosts = async (id) => {
  try {
    const res = await axiosManager.get(`/public/post/posts/${id}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPosts" }');

    return [];
  }
};

const getMyPosts = async (jwt) => {
  try {
    const res = await axiosManager.get("/private/post/my-posts", {
      headers: {
        Authorization: jwt,
      },
    });

    return res.data;
  } catch (error) {
    console.log('{ msg: "error getMyPosts" }');

    return [];
  }
};

const getFavorites = async (jwt) => {
  try {
    const res = await axiosManager.get("/private/favorite/favorites", {
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
    const res = await axiosManager.get("/private/post/followersposts", {
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

const getHashtags = async (jwt, tag) => {
  try {
    const res = await axiosManager.get(`/private/post/search/hashtag/${tag}`, {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getHashtags" }');

    return [];
  }
};

const getPostsByTag = async (jwt, tag) => {
  try {
    const res = await axiosManager.get(
      `/private/post/search/hashtag/posts/${tag}`,
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByTag" }');

    return [];
  }
};

const getPostsByDescription = async (jwt, txt) => {
  try {
    const res = await axiosManager.get(`/private/post/search/posts/${txt}`, {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByDescription" }');

    return [];
  }
};

export const PostApi = {
  create,
  getPosts,
  getMyPosts,
  getFavorites,
  getFollowersPosts,
  getHashtags,
  getPostsByTag,
  getPostsByDescription,
};
