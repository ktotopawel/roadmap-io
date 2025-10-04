import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StatusEnum, { type StatusKeys } from '../../config/Status.enum.ts';
import api from '../../utils/axios.ts';
import { API_ENDPOINTS } from '../../config/api.ts';
import {
  type ConsumeTokenPayload,
  ConsumeTokenPayloadSchema,
  type LoginPayload,
  LoginPayloadSchema,
} from '@roadmap-io/types';
import { fetchUser } from './user.slice.ts';

interface IAuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
  status: StatusKeys;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  status: StatusEnum.IDLE,
};

const getMagicLink = createAsyncThunk(
  'auth/getMagicLink',
  async (payload: LoginPayload, thunkAPI) => {
    const parseCall = LoginPayloadSchema.safeParse(payload);
    if (!parseCall.success) {
      return thunkAPI.rejectWithValue('Wrong arguments error');
    }

    try {
      await api.post(API_ENDPOINTS.GET_MAGIC_LINK, parseCall.data);
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue('Error generating magic link');
    }
  }
);

const consumeMagicLink = createAsyncThunk(
  'auth/consumeMagicLink',
  async (payload: ConsumeTokenPayload, thunkAPI) => {
    try {
      const parseCall = ConsumeTokenPayloadSchema.safeParse(payload);

      if (!parseCall.success) {
        return thunkAPI.rejectWithValue('Wrong arguments error');
      }

      await api.post(API_ENDPOINTS.CONSUME_MAGIC_LINK, parseCall.data);
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue('Error consuming magic link');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(consumeMagicLink.pending, (state) => {
      state.status = StatusEnum.LOADING;
    });
    builder.addCase(consumeMagicLink.rejected, (state, action) => {
      state.status = StatusEnum.FAILED;
      console.error(action.payload);
    });
    builder.addCase(consumeMagicLink.fulfilled, (state) => {
      state.status = StatusEnum.SUCCEEDED;
      state.isAuthenticated = true;
      //todo fetch user data
    });
    builder.addCase(fetchUser.fulfilled, (state) => {
      state.isAuthenticated = true;
    });
  },
});

export default authSlice.reducer;

export { consumeMagicLink, getMagicLink };
