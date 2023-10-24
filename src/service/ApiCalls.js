import apiClient from "./ApiClient";
import { END_POINTS } from "../constants/Constants";

async function addUser(user) {
  try {
    const response = await apiClient.post(END_POINTS.ADD_USER, user);
    return response;
  } catch (error) {
    throw error;
  }
}

export { addUser };
