import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://backend-kuepa-production.up.railway.app/api",
});
