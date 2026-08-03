import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../constants/endpoints";

export const signup = (data) =>
  axiosInstance.post(API_END_POINTS.SIGNUP, data);

export const signin = (data) =>
  axiosInstance.post(API_END_POINTS.SIGNIN, data);

export const forgotPassword = (data) =>
  axiosInstance.post(API_END_POINTS.FORGOT_PASSWORD, data);
