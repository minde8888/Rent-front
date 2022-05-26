export default function authHeader():
    | {
          Authorization: string;
      }
    | {
          Authorization?: undefined;
      } {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) user = JSON.parse(userStr);
    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
