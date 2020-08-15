import * as actionTypes from "../actions/actions";
import { updateObject } from "../../Shared/utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};
const authSuccess = (state, action) => {
  const updatedState = {
    token: action.authData.idToken,
    userId: action.authData.localId,
    error: null,
    loading: false,
  };
  return updateObject(state, updatedState);
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { token: null, userId: null, loading: false });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};
export default reducer;
