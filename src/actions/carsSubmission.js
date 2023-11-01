import { postCarData } from "../api/car";
import { handleCatch } from "./common";

export function submitCarData(carData) {
  return (dispatch) => {
    dispatch({ type: "SUBMIT_CAR_DATA_REQUEST", payload: { carData } });

    return postCarData(carData)
      .then(async (response) => {
        const data = response?.data;

        dispatch({ type: "SUBMIT_CAR_DATA_SUCESS", payload: data });

        return data;
      })
      .catch(async (error) => {
        dispatch({
          type: "SUBMIT_CAR_DATA_ERROR",
          error: error?.response?.data?.error,
        });
        await handleCatch(error);
      });
  };
}
