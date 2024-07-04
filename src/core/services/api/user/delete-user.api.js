import http from "../../interceptor";

export const deleteUserAPI = async (userId) => {
  try {
    const response = await http.delete("/User/DeleteUser", {
      data: {
        userId,
      },
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
