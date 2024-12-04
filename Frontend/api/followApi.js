import axiosManager from "./apiManager";

const createFollow = async (jwt, follower, followed) => {
  try {
    const { data } = await axiosManager.post(
      "/private/follow/follows",
      { follower, followed },
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

const deleteFollow = async (jwt, follower, followed) => {
  try {
    const { data } = await axiosManager.put(
      "/private/follow/follows",
      { follower, followed },
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

export const FollowApi = {
  createFollow,
  deleteFollow,
};
