import React, {useState, useContext} from 'react';
type LoaderProps = {
  show: () => void;
  dissmiss: () => void;
  isShow: boolean;
};

const DefaultValue: LoaderProps = {
  show: () => {},
  dissmiss: () => {},
  isShow: false,
};

const LoaderContext = React.createContext(DefaultValue);
export const LoaderProvider = LoaderContext.Provider;
export const useLoaderValue = (): LoaderProps => {
  const [isShow, setIsShow] = useState(false);
  const show = () => {
    setIsShow(true);
  };
  const dissmiss = () => {
    setIsShow(false);
  };
  return {
    isShow,
    show,
    dissmiss,
  };
};

export const useLoader = (): LoaderProps => {
  return useContext(LoaderContext);
};
