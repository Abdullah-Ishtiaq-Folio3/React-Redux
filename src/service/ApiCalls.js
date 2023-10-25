import apiClient from "./ApiClient";
import { END_POINTS } from "../constants/Constants";

async function addUser(user) {
  try {
    const response = await apiClient.post(END_POINTS.ADD_UPDATE_USER, user);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    const response = await apiClient.get(END_POINTS.GET_USERS);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id) {
  try {
    const response = await apiClient.put(END_POINTS.ADD_UPDATE_USER + id);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

async function checkEmailAvailability(email) {
  try {
    const response = await apiClient.post(END_POINTS.IS_EMAIL_AVAILABLE, {
      email: email,
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export { addUser, getUsers, updateUser, checkEmailAvailability };
