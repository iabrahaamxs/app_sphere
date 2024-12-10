import axiosManager from "./apiManager";

const login = async (data) => {
  try {
    const res = await axiosManager.post("/public/user/login", data);

    return res.data;
  } catch (error) {
    //console.log(error);
    return { msg: "error login" };
  }
};

const register = async (data) => {
  try {
    const res = await axiosManager.post("/public/user/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error register" };
  }
};

const whoami = async (jwt) => {
  try {
    const { data } = await axiosManager.get("/private/user/whoami", {
      headers: {
        Authorization: jwt,
      },
    });

    return data.info;
  } catch (error) {
    console.log(error);
    return { msg: "error whoami" };
  }
};

const getProfile = async (id) => {
  try {
    const { data } = await axiosManager.get(`/public/user/profile/${id}`);

    return data.info;
  } catch (error) {
    console.log(error);
    return { msg: "error getProfile" };
  }
};

const getFollows = async (jwt, page, limit) => {
  try {
    const res = await axiosManager.get("/private/follow/follows", {
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
    console.log('{ msg: "error getFollows" }');

    return [];
  }
};

const getFollowed = async (jwt, page, limit) => {
  try {
    const res = await axiosManager.get("/private/follow/followed", {
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
    console.log('{ msg: "error getFollowed" }');

    return [];
  }
};

const countMyFollows = async (jwt) => {
  try {
    const res = await axiosManager.get("/private/follow/followers/count", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data.followers_count;
  } catch (error) {
    console.log('{ msg: "error countMyFollows" }');

    return [];
  }
};

const countMyFollowed = async (jwt) => {
  try {
    const res = await axiosManager.get("/private/follow/followed/count", {
      headers: {
        Authorization: jwt,
      },
    });
    return res.data.followed_count;
  } catch (error) {
    console.log('{ msg: "error countMyFollowed" }');

    return [];
  }
};

const countFollowed = async (id) => {
  try {
    const res = await axiosManager.get(`/public/follow/followed/count/${id}`);
    return res.data.followed_count;
  } catch (error) {
    console.log('{ msg: "error countFollowed" }');

    return [];
  }
};

const countFollows = async (id) => {
  try {
    const res = await axiosManager.get(`/public/follow/followers/count/${id}`);
    return res.data.followers_count;
  } catch (error) {
    console.log('{ msg: "error countFollows" }');

    return [];
  }
};

const searchUsers = async (txt, jwt) => {
  try {
    const res = await axiosManager.get("private/user/search/users", {
      headers: {
        Authorization: jwt,
      },
      params: {
        txt: txt,
      },
    });

    return res.data;
  } catch (error) {
    console.log('{ msg: "error searchUsers" }');

    return [];
  }
};

const updateInformation = async (
  name,
  last_name,
  email,
  phone,
  birthdate,
  country,
  gender,
  jwt
) => {
  try {
    const res = await axiosManager.put(
      "/private/user/information",
      {
        name,
        last_name,
        email,
        phone,
        birthdate,
        country,
        gender,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log('{ msg: "error updateInformation" }');

    return false;
  }
};

const updateSettings = async (
  user_photo,
  user_name,
  bio,
  categoriesOn,
  categoriesOff,
  jwt
) => {
  try {
    const res = await axiosManager.put(
      "/private/user/setting",
      {
        user_photo,
        user_name,
        bio,
        categoriesOn,
        categoriesOff,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log('{ msg: "error updateSettings" }');

    return false;
  }
};

const validateNewUser = async (data) => {
  try {
    const res = await axiosManager.post("/public/user/register/validate", data);

    return res.data;
  } catch (error) {
    return { msg: "error validateNewUser" };
  }
};

const updatePassword = async (new_password, password, jwt) => {
  try {
    const { data } = await axiosManager.put(
      "/private/user/password",
      {
        new_password,
        password,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error updatePassword");
    return;
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await axiosManager.post("/public/user/forgot-password", {
      email,
    });

    return res.data;
  } catch (error) {
    console.log("error forgotPassword");
    return;
  }
};

const restorePassword = async (jwt, password) => {
  try {
    const { data } = await axiosManager.put(
      "/private/user/restore-password",
      {
        password,
      },
      {
        headers: {
          Authorization: jwt,
        },
      }
    );

    return data;
  } catch (error) {
    console.log("error restorePassword");
    return { ok: false };
  }
};

export const UserApi = {
  login,
  register,
  whoami,
  getProfile,
  getFollows,
  getFollowed,
  countMyFollowed,
  countMyFollows,
  countFollowed,
  countFollows,
  searchUsers,
  updateInformation,
  updateSettings,
  validateNewUser,
  updatePassword,
  forgotPassword,
  restorePassword,
};
