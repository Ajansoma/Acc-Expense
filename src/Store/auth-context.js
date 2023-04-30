import React from "react";
const AuthContext = React.createContext({
  login: "",
  logout: null,
  loginHandler: () => {},
  logoutHandler: () => {},
});

export default AuthContext;
