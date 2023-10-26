const BASE_URL = "https://api.escuelajs.co/api/v1";

const END_POINTS = {
  ADD_UPDATE_USER: "/users/",
  FILE_UPLOAD: "/files/upload",
  GET_USERS: "/users",
  IS_EMAIL_AVAILABLE: "/users/is-available",
};

const ROLES = {
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
  ADMIN: "admin",
};

const USER_ACTIONS = {
  FETCH_USERS: "users/getUsers",
  EDIT_USER: "users/updateUser",
  CREATE_USER: "users/addUser",
  SET_OPEN_MODAL: "users/openModal",
  SET_CURRENT_USER: "users/setCurrentUser",
  DELETE_USER: "users/deleteUser",
  CHANGE_PAGE: "users/changePage",
  FILTER_USERS: "users/filterUsers",
  ADD_PHONE_NUMBER: "users/addPhoneNumber",
};

export { BASE_URL, END_POINTS, ROLES, USER_ACTIONS };
