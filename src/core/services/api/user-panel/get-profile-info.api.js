import http from "../../interceptor";

export const getProfileInfoAPI = async () => {
  try {
    const response = await http.get("/SharePanel/GetProfileInfo");

    return response.data;
  } catch (error) {
    return false;
  }
};
