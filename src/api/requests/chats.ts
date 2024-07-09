import { Axios } from "../config";

export const getChats = async () => {
  return Axios.get("/chats/get-chats");
};
