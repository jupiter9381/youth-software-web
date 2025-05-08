import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now(); // Token is expired if `exp` is in the past
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return true; // If decoding fails, treat the token as expired
  }
};
