import axios from "axios";
import apiURL from "./api-url";

export const registerUserAPI = async (
  name: string,
  email: string,
  password: string
) => {
  return axios.post(`${apiURL}/users/register`, { name, email, password });
};

export const loginUserAPI = async (email: string, password: string) => {
  return axios.post(`${apiURL}/users/login`, { email, password });
};
