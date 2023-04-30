import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const getStorage = JSON.parse(localStorage.getItem("user")) || null;
  const [login, setLogin] = useState("");
  const [logout, setLogout] = useState(null);

  const loginHandler = function (token) {
    setLogin(token);
  };

  const logoutHandler = function () {
    setLogout(null);
  };

  const authValues = {
    login: login,
    logout: null,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authValues}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
