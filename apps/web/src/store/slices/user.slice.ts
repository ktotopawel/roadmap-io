import { type SerializeUser, type User, UserSchema } from '@roadmap-io/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/axios.ts';
import { API_ENDPOINTS } from '../../config/api.ts';
import StatusEnum, { type StatusKeys } from '../../config/Status.enum.ts';
import type { AxiosResponse } from 'axios';

interface IUserSlice {
  me: SerializeUser | null;
  status: StatusKeys;
}

const initialState: IUserSlice = {
  me: null,
  status: StatusEnum.IDLE,
};

const fetchUser = createAsyncThunk('user/fetchUser', async (_payload, thunkAPI) => {
  try {
    const res: AxiosResponse<{ user: User }> = await api.get(API_ENDPOINTS.FETCH_USER);

    const parsedRes = UserSchema.safeParse(res.data.user);

    if (!parsedRes.success) {
      return thunkAPI.rejectWithValue('Wrong server response');
    }

    const serializedUser: SerializeUser = {
      ...parsedRes.data,
      createdAt: parsedRes.data.createdAt.toISOString(),
    };

    return thunkAPI.fulfillWithValue(serializedUser);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.error(action.error);
      state.status = StatusEnum.FAILED;
    });
  },
});

export default userSlice.reducer;

export { fetchUser };
