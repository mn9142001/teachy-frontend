import { Navigate } from 'react-router-dom';
import { setAuthToken, TOKEN_KEYWORD } from "../../hooks/is_anonymous";

const PROFILE_KEYWORD = "profile_data"

const setAuthData = response => {
    setAuthToken(response.data.access)
    sessionStorage.setItem(PROFILE_KEYWORD, JSON.stringify(response.data))
}

const getAuthData = _ => {
    return JSON.parse(sessionStorage.getItem(PROFILE_KEYWORD))
}

const LogOut = _ => {
    sessionStorage.removeItem(PROFILE_KEYWORD)
    sessionStorage.removeItem(TOKEN_KEYWORD)
    return <Navigate to={"/login/"} />
}

export {setAuthData, getAuthData, LogOut}