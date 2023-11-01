import baseURL from "./index";

export const postAuth = (email, password) => {
  return baseURL.post(`/auth/login`, {
    email,
    password,
  });
};
