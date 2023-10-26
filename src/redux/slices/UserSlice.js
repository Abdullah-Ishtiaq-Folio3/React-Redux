import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, editUser, createUser } from "../actions/UserAction";

const initialState = {
  users: [],
  filteredUsers: [],
  usersToDisplay: [],

  currentFilter: "",
  currentPage: 0,
  currentPageSize: 0,
  currentUser: null,

  fetchLoading: false,
  fetchError: null,

  addLoading: false,
  addError: null,

  updateLoading: false,
  updateError: null,

  openModal: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.openModal = action.payload;
      if (!action.payload) {
        state.addError = null;
        state.updateError = null;
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    changePage: (state, action) => {
      const { page, size } = action.payload;
      state.currentPageSize = size;
      state.currentPage = page;
      state.usersToDisplay = state.filteredUsers.slice(
        (page - 1) * size,
        page * size
      );
    },
    filterUsers: (state, action) => {
      state.currentFilter = action.payload;
      if (action.payload === "") {
        state.filteredUsers = state.users.map((user) => user);
      } else {
        state.filteredUsers = state.users.filter(
          (user) => user.role === action.payload
        );
      }
    },
    addPhoneNumber: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id
          ? { ...user, phone: action.payload.phone }
          : user
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.fetchLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.error;
      })

      .addCase(editUser.pending, (state, action) => {
        state.updateLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.currentUser = null;
        state.openModal = false;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.currentUser = null;
        state.updateError = action.error;
      })

      .addCase(createUser.pending, (state, action) => {
        state.addLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.addLoading = false;
        state.users.push(action.payload);
        state.openModal = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error;
      });
  },
});
