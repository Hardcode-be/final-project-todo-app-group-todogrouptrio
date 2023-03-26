

export const BASE_URL='http://localhost:8080/'

export function getHeader(token) {
    return { headers: {"Authorization" : `Bearer ${token}`} }
}

