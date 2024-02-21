import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setAccessToken, setRefeshToken, setUserId } from "../utils/authUtils";
import { api } from "../config/apiConfig";

// lay id vs jwt

/**
    user = {
        id: "65bea1086557c558938a92a8",
        name: "admin",
        email: "admin@gmail.com",
        image: "https://res.cloudinary.com/anhdaden/image/upload/v1705400758/demo_spring/vm2ydxq01xvz9rs3w3gn.jpg",
        roles: ["USER", "ADMIN"],
    }
]
 */

export const fetchInfo = createAsyncThunk("authv2/getInfo", async () => {
  const a = await api.post("/user/profile", "", {});
  return a.data.data;
});

const authSlice = createSlice({
  name: "authv2",
  initialState: {
    isLogged: false,
    logging: false,
    currentUser: null,
    type: null,
  },
  reducers: {
    login: (state) => {
      state.logging = true;
    },

    loginSuccess: (state, action) => {
      setUserId(action.payload.user.id);
      setAccessToken(action.payload.token.accessToken);
      setRefeshToken(action.payload.token.refreshToken);
      state.logging = false;
      state.currentUser = action.payload.user;
    },

    loginFaled: (state) => {
      state.logging = false;
    },

    logout: (state) => {
      state.isLogged = false;
      state.currentUser = null;
      // setUserId(action.payload.id)
      // setAccessToken(action.payload.token.accessToken)
      // setRefeshToken(action.payload.token.refreshToken)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInfo.rejected, (state, action) => {
        // state.status = StatusState.FAIL
        state.error = action.error;
      })
      .addCase(fetchInfo.fulfilled, (state, action) => {
        // state.status = StatusState.SUCCESS
        state.currentUser = action.payload;
      });
  },
});
const authv2Reducer = authSlice.reducer;

const authAction = authSlice.actions;

// export select
const selectAuth = {
  selectIsLogging: (state) => state.authv2.logging,
  selectCurrentUser: (state) => {
    console.log(state);
    return state.authv2.currentUser;
  },
};
export { authAction, selectAuth };
// export default reducer
export default authv2Reducer;
