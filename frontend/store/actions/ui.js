import * as actionsTypes from "./actionsTypes";

export const setLoading = (isLoad) => {
  return {
    type: actionsTypes.SET_LOADING,
    isLoad,
  };
};
