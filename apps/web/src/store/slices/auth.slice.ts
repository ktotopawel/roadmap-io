import { createSlice } from '@reduxjs/toolkit';
import StatusEnum, { type StatusKeys } from '../../../config/Status.enum.ts';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
