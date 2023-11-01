import baseURL from "./index";

export const postCarData = (data) => {
  return baseURL.post(`/car`, data);
};
