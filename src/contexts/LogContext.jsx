import { useState, createContext } from "react";

const logsDefaultValue = {
  user_name: "",
  email: "",
  isAuthenticated: false,
  loginUser: () => null,
  logoutUser: () => null,
};

export const LogContext = createContext(logsDefaultValue);

const LogContextProvider = ({ children }) => {
  const [logged, setLoggedIn] = useState({
    user_name: "",
    email: "",
    isAuthenticated: false,
  });

  const loginUser = (user) =>
    setLoggedIn({
      user_name: user.user_name,
      email: user.email,
      isAuthenticated: true,
    });

  const logoutUser = () => {
    setLoggedIn({
      user_name: "",
      email: "",
      isAuthenticated: false,
    });
  };
  return (
    <LogContext.Provider value={{ ...logged, loginUser, logoutUser }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContextProvider;
