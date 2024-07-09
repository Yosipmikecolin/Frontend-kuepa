import { InputsLogin, InputsRegister } from "../../types";
import { Axios } from "../config";

export const registerUser = async (body: InputsRegister) => {
  return Axios.post("/auth/register", body);
};

export const loginUser = async (body: InputsLogin) => {
  return Axios.post("/auth/login", body);
};
