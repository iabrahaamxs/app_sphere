import axiosManager from "./apiManager";

const login = async (data) => {
  try {
    const res = await axiosManager.post("/login", data);

    return res.data;
  } catch (error) {
    //console.log(error);
    return { msg: "error login" };
  }
};

const register = async (data) => {
  try {
    const res = await axiosManager.post("/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error register" };
  }
};

const getProfile = async (jwt) => {
  try {
    const res = await axiosManager.get("/profile", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error getProfile" };
  }
};

const getFollows = async (jwt) => {
  try {
    const res = await axiosManager.get("/follows", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    return { msg: "error getFollows" };
  }
};

const getFollowed = async (jwt) => {
  try {
    const res = await axiosManager.get("/followed", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data;
  } catch (error) {
    return { msg: "error getFollowed" };
  }
};

const getPosts = async (jwt) => {
  try {
    const res = await axiosManager.get("/posts", {
      headers: {
        Authorization: jwt,
      },
    });
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

export const UserApi = {
  login,
  register,
  getProfile,
  getFollows,
  getFollowed,
  getPosts,
  getFavorites,
};
