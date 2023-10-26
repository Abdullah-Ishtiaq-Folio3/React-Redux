import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, editUser, createUser } from "../actions/UserAction";
import { current } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  usersToDisplay: [],

  currentFilter: "",
  currentPage: 1,
  currentPageSize: 12,
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
      console.log(current(state));
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
        state.filteredUsers = action.payload;
        state.usersToDisplay = action.payload.slice(0, 12);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.error;
      })

      .addCase(editUser.pending, (state, action) => {
        state.updateLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.updateLoading = false;
        if (action.payload.id == 4) console.log("user", action.payload);
        state.users = state.users.map((user) =>
          user.id == action.payload.id ? action.payload : user
        );
        state.currentUser = null;
        state.openModal = false;
        console.log(current(state));
      })
      .addCase(editUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.error;
      })

      .addCase(createUser.pending, (state, action) => {
        state.addLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.addLoading = false;
        state.users.push(action.payload);
        state.openModal = false;
        if (state.currentFilter === action.payload.role) {
          state.filteredUsers.push(action.payload);
          state.usersToDisplay.push(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.error;
      });
  },
});
