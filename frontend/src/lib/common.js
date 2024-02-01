export function storeInLocalStorage(token, userId) {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
}

export function removeAuthLocalStorage(token, userId) {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}
