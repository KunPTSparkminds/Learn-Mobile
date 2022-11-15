import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';

type AuthProps = {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
  setValueToStorage: (email: string) => void;
};

const DefaultValue: AuthProps = {
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  setValueToStorage: () => {},
};

const AuthContext = React.createContext(DefaultValue);

export const AuthContextProvider = AuthContext.Provider;
export const useAuthContextValue = (): AuthProps => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setValueToStorage = async (email: string) => {
    const currentUser: [string, string] = ['email', email];
    const isLoggedIn: [string, string] = ['isLoggedIn', 'true'];
    const createdAt: [string, string] = ['createdAt', new Date().toISOString()];
    try {
      await AsyncStorage.multiSet([currentUser, isLoggedIn, createdAt]);
    } catch (error) {
      return;
    }
  };

  const resetAuth = async () => {
    const keys = ['isLoggedIn', 'createdAt', 'email'];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      return;
    }
  };

  const logIn = () => {
    setIsLoggedIn(true);
  };

  const logOut = () => {
    resetAuth();
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    logIn,
    logOut,
    setValueToStorage,
  };
};
export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};
