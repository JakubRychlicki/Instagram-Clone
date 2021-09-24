import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";

import uiReducer from "./reducers/ui";
import userReducer from "./reducers/user";
import usersReducer from "./reducers/users";

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  users: usersReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
