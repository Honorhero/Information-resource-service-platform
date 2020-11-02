import Cookies from "js-cookie";

const TokenKey = "accessToken";
let authStart = "Bearer ";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, authStart + token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
