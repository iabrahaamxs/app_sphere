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

const getPosts = async (id, page, limit) => {
  try {
    const res = await axiosManager.get(`/public/post/posts/${id}`, {
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPosts" }');

    return [];
  }
};

const getMyPosts = async (jwt, page, limit) => {
  try {
    const res = await axiosManager.get("/private/post/my-posts", {
      headers: {
        Authorization: jwt,
      },
      params: {
        page,
        limit,
      },
    });

    return res.data;
  } catch (error) {
    console.log('{ msg: "error getMyPosts" }');

    return [];
  }
};

const getFavorites = async (jwt, page, limit) => {
  try {
    const res = await axiosManager.get("/private/favorite/favorites", {
      headers: {
        Authorization: jwt,
      },
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFavorites" }');

    return [];
  }
};

const getFollowersPosts = async (jwt, page, limit) => {
  try {
    const res = await axiosManager.get("/private/post/followersposts", {
      headers: {
        Authorization: jwt,
      },
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFollowersPosts" }');

    return [];
  }
};

const getHashtags = async (jwt, tag, page, limit) => {
  try {
    const res = await axiosManager.get(`/private/post/search/hashtag/${tag}`, {
      headers: {
        Authorization: jwt,
      },
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getHashtags" }');

    return [];
  }
};

const getPostsByTag = async (jwt, tag, page, limit) => {
  try {
    const res = await axiosManager.get(
      `/private/post/search/hashtag/posts/${tag}`,
      {
        headers: {
          Authorization: jwt,
        },
        params: {
          page,
          limit,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByTag" }');

    return [];
  }
};

const getPostsByDescription = async (jwt, txt, page, limit) => {
  try {
    const res = await axiosManager.get(`/private/post/search/posts/${txt}`, {
      headers: {
        Authorization: jwt,
      },
      params: {
        page,
        limit,
      },
    });
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getPostsByDescription" }');

    return [];
  }
};

const update = async (jwt, id, description) => {
  try {
    const res = await axiosManager.put(
      `/private/post/update`,
      { id, description },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error updatePost", error);
    return { ok: false, message: "Error updating post" };
  }
};

const deletePost = async (jwt, id) => {
  try {
    const res = await axiosManager.put(
      `/private/post/delete`,
      { id },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );
    return { ok: true, data: res.data };
  } catch (error) {
    console.error("Error deletePost", error);
    return {
      ok: false,
      message: error.response?.data?.message || "Error deleting post",
    };
  }
};

export const PostApi = {
  create,
  update,
  deletePost,
  getPosts,
  getMyPosts,
  getFavorites,
  getFollowersPosts,
  getHashtags,
  getPostsByTag,
  getPostsByDescription,
};
