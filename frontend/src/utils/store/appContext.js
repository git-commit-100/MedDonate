import React, { useState } from "react";

export const AppContext = React.createContext({
  email: "",
  token: "",
  isLoggedIn: false,
  loginHandler: (loginConfig) => {},
  logoutHandler: () => {},
});

function getDataFromLocalStorage() {
  const data = localStorage.getItem("loginConfig");
  if (data) {
    const { email, token } = JSON.parse(data);
    console.log(email, token);
    return { email: email, token: token };
  } else {
    return { email: null, token: null };
  }
}

function AppContextProvider({ children }) {
  const { email: emailFromLS, token: tokenFromLS } = getDataFromLocalStorage();
  const [email, setEmail] = useState(emailFromLS);
  const [token, setToken] = useState(tokenFromLS);

  const isLoggedIn = !!token;

  function loginHandler(loginConfig) {
    const { email, token } = loginConfig;
    setToken(token);
    setEmail(email);
    const newLoginConfig = { email: email, token: token };
    localStorage.setItem("loginConfig", JSON.stringify(newLoginConfig));
  }

  function logoutHandler() {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("loginConfig");
  }

  const contextValue = {
    email: email,
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppContextProvider;
