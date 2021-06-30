export const getToken = (): string | null => {
    return window.sessionStorage.getItem("token")
}

export const setToken = (str: string): void => {
    window.sessionStorage.setItem("token",str);
}
