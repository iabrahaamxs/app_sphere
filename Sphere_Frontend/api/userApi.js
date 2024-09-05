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

export const UserApi = {
  login,
  register,
  getProfile,
};


