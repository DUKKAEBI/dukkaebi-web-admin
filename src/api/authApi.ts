import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export interface SignInPayload {
  loginId: string;
  password: string;
}

export interface SignInRes {
  accessToken: string;
  refreshToken: string;
}

export const signIn = (payload: SignInPayload) =>
  axios.post<SignInRes>(`${apiUrl}/auth/sign-in`, payload);

export const refreshToken = (token: string) =>
  axios.post<{ accessToken: string }>(`${apiUrl}/auth/refresh`, { token });

export default { signIn, refreshToken };
