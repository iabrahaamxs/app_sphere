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

// const getUser = async (userName) => {
//   try {
//     const res = await axiosManager.get("/user", {
//       params: {
//         user_name: userName,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     return { msg: "error getUser" };
//   }
// };

export const UserApi = {
  login,
  register,
  getProfile,
  getFollows,
  getFollowed,
  searchUsers,
  //getUser,
};
