import axios from "axios";
import { variables } from "../utils";
export const apiInstance = axios.create({
  baseURL: variables.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${variables.ACCESS_TOKEN_SECRET}`,
  },
});
