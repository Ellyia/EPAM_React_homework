import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const signin = (token, cb) => {
    setToken(token);
    cb();
  };

  const signout = (cb) => {
    setToken(null);
    cb();
  };

  const value1 = {
    token,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value1}>{children}</AuthContext.Provider>;
};
