import React, { useReducer, createContext } from 'react';
import jwt_decode from "jwt-decode";

const initialState = { user: null };

// look for token and whether its expired
if (localStorage.getItem('jwtToken')){
    const decodedToken = jwt_decode(localStorage.getItem('jwtToken'));

    // if token is expired: set logged out
    if(decodedToken.exp * 1000 < Date.now()){
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
})

function authReducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
            default:
                return state;
    }
}
function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData){
        // session login based on token
        localStorage.setItem('jwtToken', userData.token);
        dispatch({
            type: 'LOGIN',
            payload: userData
        });
    }

    function logout(){
        localStorage.removeItem('jwtToken');

        dispatch({type: 'LOGOUT'});
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }