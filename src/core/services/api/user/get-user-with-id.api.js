import http from "../../interceptor";

export const getUserWithIdAPI = async (userId) => {
  try {
    const response = await http.get(`/User/UserDetails/${userId}`);

    return response.data;
  } catch (error) {
    return false;
  }
};
