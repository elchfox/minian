
import React ,{createContext} from 'react';
import {useLocalObservable} from "mobx-react-lite";

import GeneralStore from "./GeneralStore";

const StoreContext = createContext();
const StoreProvider = ({ children }) => {

    const General = useLocalObservable(() => GeneralStore);

    const store = {General}
  
    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };

  export {
    GeneralStore
};
export default StoreProvider
