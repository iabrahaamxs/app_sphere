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

const getProfile = async (user) => {
  try {
    const res = await axiosManager.get(`/profile/${user}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error getProfile" };
  }
};

const getFollows = async (id) => {
  try {
    const res = await axiosManager.get(`/follows/${id}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFollows" }');

    return [];
  }
};

const getFollowed = async (id) => {
  try {
    const res = await axiosManager.get(`/followed/${id}`);
    return res.data;
  } catch (error) {
    console.log('{ msg: "error getFollowed" }');

    return [];
  }
};

const searchUsers = async (txt) => {
  try {
    const res = await axiosManager.get("/search/users", {
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
  user_id
) => {
  try {
    const res = await axiosManager.put("/information", {
      name,
      last_name,
      email,
      phone,
      birthdate,
      country,
      gender,
      user_id,
    });

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
  user_id
) => {
  try {
    const res = await axiosManager.put("/setting", {
      user_photo,
      user_name,
      bio,
      categoriesOn,
      categoriesOff,
      user_id,
    });

    return res.data;
  } catch (error) {
    console.log('{ msg: "error updateSettings" }');

    return false;
  }
};

const validateNewUser = async (data) => {
  try {
    const res = await axiosManager.post("/register/validate", data);

    return res.data;
  } catch (error) {
    return { msg: "error validateNewUser" };
  }
};

const updatePassword = async (new_password, user_id, password) => {
  try {
    const res = await axiosManager.put("/password", {
      new_password,
      user_id,
      password,
    });

    return res.data.ok;
  } catch (error) {
    console.log("error updatePassword");
    return;
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await axiosManager.post("/forgot-password", {
      email,
    });

    return res.data;
  } catch (error) {
    console.log("error forgotPassword");
    return;
  }
};

export const UserApi = {
  login,
  register,
  getProfile,
  getFollows,
  getFollowed,
  searchUsers,
  updateInformation,
  updateSettings,
  validateNewUser,
  updatePassword,
  forgotPassword,
};
