import * as actionsTypes from "../actions/actionsTypes";

const initialState = {
  loading: false,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SET_LOADING:
      return {
        ...state,
        loading: action.isLoad,
      };
    default:
      return state;
  }
};

export default uiReducer;
