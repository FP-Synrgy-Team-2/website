export function getUserData() {
  return JSON.parse(localStorage.getItem('token') || '{}');
}