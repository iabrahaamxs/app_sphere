import axiosManager from "./apiManager";

const login = async (data) => {
  try {
    const res = await axiosManager.post("/login", data);

    return res.data;
  } catch (error) {
    //console.log(error);
    return { msg: "error" };
  }
};

const register = async (data) => {
  try {
    const res = await axiosManager.post("/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return { msg: "error" };
  }
};

export const UserApi = {
  login,
  register,
};
