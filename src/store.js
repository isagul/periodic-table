import React from 'react';

export const Store = React.createContext();

const initialState = {
    elements: [],
    loading: true
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return {...state, elements: [...action.payload]};    
        case 'SET_LOADING':
            return {...state, loading: action.payload}                
        default:
          return state;
      }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const value = {
        state,
        dispatch
    }

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    )
}