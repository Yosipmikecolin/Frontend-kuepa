import { InputsRegister } from "../../types";
import { Axios } from "../config";

export const registerUser = async (body: InputsRegister) => {
  return Axios.post("/register", body);
};
