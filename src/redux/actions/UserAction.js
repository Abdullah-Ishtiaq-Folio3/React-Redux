import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser } from "../../service/ApiCalls";
import { USER_ACTIONS } from "../../constants/Constants";

// Async Thunk calls
const fetchUsers = createAsyncThunk(USER_ACTIONS.FETCH_USERS, getUsers);
const editUser = createAsyncThunk(USER_ACTIONS.EDIT_USER, async (user) =>
  updateUser(user)
);
const createUser = createAsyncThunk(USER_ACTIONS.CREATE_USER, async (user) => {
  return await addUser(user);
});

// Actions
const setOpenModal = createAction(USER_ACTIONS.SET_OPEN_MODAL);
const setCurrentUser = createAction(USER_ACTIONS.SET_CURRENT_USER);
const deleteUser = createAction(USER_ACTIONS.DELETE_USER);
const changePage = createAction(USER_ACTIONS.CHANGE_PAGE);
const filterUsers = createAction(USER_ACTIONS.FILTER_USERS);
const addPhoneNumber = createAction(USER_ACTIONS.ADD_PHONE_NUMBER);

export {
  fetchUsers,
  editUser,
  createUser,
  setOpenModal,
  setCurrentUser,
  deleteUser,
  changePage,
  filterUsers,
  addPhoneNumber,
};
