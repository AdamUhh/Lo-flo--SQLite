import axios from "axios";

// ? create default parameters
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true, // ? allows cookies to go through with request (allow cookies to work)
});

export function makeRequest(url, options) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) =>
      Promise.reject(error?.response?.data?.message ?? "Error")
    );
}
