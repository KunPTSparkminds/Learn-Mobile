import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';

type AuthProps = {
  isLoggedIn: boolean;
  isSetPinCode: boolean;
  logIn: () => void;
  logOut: () => void;
  setPincode: () => void;
  setValueToStorage: (email: string) => void;
};

const DefaultValue: AuthProps = {
  isSetPinCode: false,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  setPincode: () => {},
  setValueToStorage: () => {},
};

const AuthContext = React.createContext(DefaultValue);

export const AuthContextProvider = AuthContext.Provider;
export const useAuthContextValue = (): AuthProps => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSetPinCode, setIsSetPinCode] = useState(false);

  const setPincode = async () => {
    setIsSetPinCode(true);
  };

  const setValueToStorage = async (email: string) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('createdAt', new Date().toISOString());
    } catch (error) {
      return;
    }
  };

  const resetAuth = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('createdAt');
    } catch (error) {
      return;
    }
  };

  const logIn = () => {
    setIsLoggedIn(true);
  };
  const logOut = () => {
    setIsLoggedIn(false);
    resetAuth();
  };

  return {
    isSetPinCode,
    isLoggedIn,
    logIn,
    logOut,
    setValueToStorage,
    setPincode,
  };
};
export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};
