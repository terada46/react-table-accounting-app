import React, { createContext, useContext, useState, useMemo } from 'react';

const useApi = (apiFactory, initialState) => {
    let [ state, setState ] = useState(initialState);
    return useMemo(() => apiFactory({ state, setState }), [
        state,
        setState,
        apiFactory
    ]);
};
  
const createStore = (apiFactory, initialState) => {
    const StoreContext = createContext();
    const StoreProvider = props => {
        let store = useApi(apiFactory, initialState);
        return (
            <StoreContext.Provider value={store}>
                {props.children}
            </StoreContext.Provider>
        )
    }

    let useStore = () => {
        return useContext(StoreContext);
    }

    return [ StoreProvider, useStore ]
};

export default createStore;