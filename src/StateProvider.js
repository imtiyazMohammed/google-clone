import React, {createContext, useContext, useReducer}  from 'react'

// Preparing the Data Layer
export const StateContext = createContext();

export const StateProvider = ({reducer, initialState, children}) => {
    return(<StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>)
}

//Hook which allows us to pull information from Data Layer
export const useStateValue = () => useContext(StateContext)