import React, {useState, useEffect, useCallback} from 'react'

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {}, 
    logout: () => {}
})

const getRemainingtime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpiration = new Date(expirationTime).getTime();

    const remainingDuration = adjExpiration - currentTime;
    return remainingDuration;
}

const getStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');

    const RemainingTime = getRemainingtime(storedExpirationTime);

    if(RemainingTime <= 60000){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: RemainingTime
    };
}

export const AuthContextProvider = (props) => {
    const tokenData = getStoredToken();
    let initialToken;
    if(tokenData){
        initialToken = tokenData.token;
    }
     
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime')

        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = getRemainingtime(expirationTime)
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    useEffect(() => {
        if(tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler])

    const contextValue ={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;