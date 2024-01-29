'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';

export interface PageStateContext {
  isLoading: boolean;
  setIsLoading: (isInit: boolean) => void;
}

const contextDefaultValue: PageStateContext = {
  isLoading: false,
  setIsLoading: () => {}
};

const PageStateContext = createContext<PageStateContext>(contextDefaultValue);

export function PageStateProvider({ children }: {
  children: ReactNode
}) {
  const useContext = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(contextDefaultValue.isLoading);

    return {
      isLoading,
      setIsLoading
    };
  };

  return (
    <PageStateContext.Provider value={ useContext() }>
      { children }
    </PageStateContext.Provider>
  )
}

export const usePageStateContext = () => useContext(PageStateContext);