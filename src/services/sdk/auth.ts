import {axiosInstance} from "./axiosIntance";

export const login = async (username: string | undefined, password: string | undefined) => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: "/auth/login",
      auth: { username, password },
    });
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const authCheck = async () => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: "/auth/authCheck",
    });

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: "/auth/forgot-password",
      data: { email },
    });

    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTokenRefreshed = async (usuarioId: number) => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: "/auth/get-token-refreshed/" + usuarioId,
    });
    
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
}
