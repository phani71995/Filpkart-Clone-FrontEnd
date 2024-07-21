import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const resetState = createAction('resetState');

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserdetails: (state, action) => {
            state.user = action.payload.userData;
            console.log("action.payload", action.payload.userData)

        }


    },
    extraReducers: (builder) => {
        builder.addCase(resetState, () => initialState);
    },
})

// Action creators are generated for each case reducer function
export const { setUserdetails } = userSlice.actions

export default userSlice.reducer