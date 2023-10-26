import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser } from "../../service/ApiCalls";

const fetchUsers = createAsyncThunk("users/getUsers", getUsers);
const editUser = createAsyncThunk("users/updateUser", async (user) =>
  updateUser(user)
);
const createUser = createAsyncThunk("users/addUser", async (user) => {
  console.log("thunk");
  return await addUser(user);
});

const setOpenModal = createAction("users/openModal");
const setCurrentUser = createAction("users/setCurrentUser");
const deleteUser = createAction("users/deleteUser");
const changePage = createAction("users/changePage");
const filterUsers = createAction("users/filterUsers");
export {
  fetchUsers,
  editUser,
  createUser,
  setOpenModal,
  setCurrentUser,
  deleteUser,
  changePage,
  filterUsers,
};
