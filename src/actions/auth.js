import * as AUTH from "../api/auth";

import { handleCatch, handleSuccess } from "./common";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../reducers/auth";

export function login(email, password) {
  return (dispatch) => {
    dispatch({ type: "LOGIN_REQUEST", payload: { email, password } });

    return AUTH.postAuth(email, password)
      .then(async (response) => {
        const data = response?.data;

        await handleSuccess("Logged in Successfully");
        localStorage.setItem("userToken", data?.token);

        dispatch({ type: LOGIN_SUCCESS, payload: data });

        return response?.data;
      })
      .catch(async (error) => {
        dispatch({ type: LOGIN_FAILURE, error: error?.response?.data?.error });
        await handleCatch(error);
      });
  };
}
