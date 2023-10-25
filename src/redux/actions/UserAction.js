import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../service/ApiCalls";

const fetchUsers = createAsyncThunk("users/getUsers", getUsers);

export { fetchUsers };
