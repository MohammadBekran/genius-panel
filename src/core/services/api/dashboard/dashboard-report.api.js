import http from "../../interceptor";

export const dashboardReportAPI = async () => {
  try {
    const response = await http.get("/Report/DashboardReport");

    return response.data;
  } catch (error) {
    return false;
  }
};
