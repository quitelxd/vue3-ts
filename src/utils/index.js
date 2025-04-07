export const getToken = () => {
    return window.sessionStorage.getItem("token")
}

export const setToken = (str) => {
    window.sessionStorage.setItem("token",str);
} 