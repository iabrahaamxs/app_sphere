import axiosManager from "./apiManager";

export const getCountries = async () => {
  try {
    const res = await axiosManager.get("/countries");
    //console.log(res.data)

    return res.data;
  } catch (error) {
    //console.log(error);
    return { msg: "error" };
  }
};
