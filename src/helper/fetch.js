import fetch from "node-fetch";
const URL = "http://localhost:3000";
const fetchData = async (method, path, body) => {
    const token = localStorage.getItem('access_token') || null;
    const res = await fetch(`${URL}${path}`,{
        method: method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json', 'access_token': token },
    });
    return res;
}

export default {
    GET: (path) => fetchData('GET', path),
    POST: (path, body) => fetchData('POST', path, body),
    PUT: (path, body) => fetchData('PUT', path, body),
    DELETE: (path, body) => fetchData('DELETE', path, body),
}