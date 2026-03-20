import { createSlice} from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authAction";

// export const registerUser = createAsyncThunk(
//   "auth/signup",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/api/auth/register", formData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Signup failed");
//     }
//   },
// );

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     const { email, password } = data;
//     try {
//       // const response = await login(data);
//       const response = await api.post("/api/auth/login", { email, password });
//       localStorage.setItem("authToken", response.data?.token); // store user token in localstorage

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Login failed");
//     }
//   },
// );

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
       localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
