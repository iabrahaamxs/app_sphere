import axiosManager from "./apiManager";

const getComments = async (jwt, post) => {
  try {
    const { data } = await axiosManager.get("/private/comment/comments", {
      headers: {
        Authorization: jwt,
      },
      params: {
        post,
      },
    });
    return data;
  } catch (error) {
    console.log("error getComments");
    return;
  }
};

const count = async (jwt, post) => {
  try {
    const { data } = await axiosManager.get("/private/comment/count", {
      headers: {
        Authorization: jwt,
      },
      params: {
        post,
      },
    });
    return data.comments_count;
  } catch (error) {
    console.log("error count");
    return;
  }
};

const createComment = async (jwt, post, text) => {
  try {
    const { data } = await axiosManager.post(
      "/private/comment/create",
      { post, text },
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

export const CommentApi = {
  getComments,
  count,
  createComment,
};
