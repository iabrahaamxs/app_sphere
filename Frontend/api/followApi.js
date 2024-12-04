import axiosManager from "./apiManager";

const createFollow = async (jwt, followed) => {
  try {
    const { data } = await axiosManager.post(
      "/private/follow/follows",
      { followed },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error createFollow");
    return;
  }
};

const deleteFollow = async (jwt, followed) => {
  try {
    const { data } = await axiosManager.put(
      "/private/follow/follows",
      { followed },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error deleteFollow");
    return;
  }
};

const isfollow = async (jwt, followed) => {
  try {
    const { data } = await axiosManager.get("/private/follow/isfollow", {
      headers: {
        Authorization: jwt,
      },
      params: {
        followed,
      },
    });
    return data;
  } catch (error) {
    console.log("error isfollow");
    return;
  }
};

export const FollowApi = {
  createFollow,
  deleteFollow,
  isfollow,
};
