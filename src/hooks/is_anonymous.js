
const getAuthToken = _ => {
    const token = sessionStorage.getItem("token")
    return token
}

const TOKEN_KEYWORD = "token"

const setAuthToken = _token => {
    sessionStorage.setItem(TOKEN_KEYWORD, _token)
}

const IsAuthenticated = _ => {
    let token = getAuthToken()
    return token != null

}

export {getAuthToken, setAuthToken, IsAuthenticated, TOKEN_KEYWORD}