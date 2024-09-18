import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        role: null,
        token: null,
    },
    reducers: {
        setUser: (state,action) => {
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.role = null;
            state.token = null;
        },
    },
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;