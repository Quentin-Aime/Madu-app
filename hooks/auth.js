import * as React from "react";
export const AuthContext = React.createContext();

export const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      // AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      // AsyncStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        // user: action.payload.user,
        // token: action.payload.token,
      };
    case "LOGOUT":
      AsyncStorageclear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
