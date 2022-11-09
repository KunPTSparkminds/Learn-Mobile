import React, {useContext, useState} from 'react';

type AuthProps = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};

const DefaultValue: AuthProps = {
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = React.createContext(DefaultValue);

export const AuthContextProvider = AuthContext.Provider;
export const useAuthContextValue = (): AuthProps => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
  };
  return {
    isLoggedIn,
    logIn,
    logOut,
  };
};
export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};
