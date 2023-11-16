import {createSlice} from '@reduxjs/toolkit'
import {createUser} from "../../firebase/createUser";

const initialState = {
    isLogin: false,
    id: '',
    name: ''
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isLogin: (state, action) => {
            if (action.payload) {
                state.isLogin = action.payload
            } else {
                state.isLogin = false;
                state.id = '';
                state.name = '';
            }


        },
        isData: (state, action) => {
            state.id = action.payload.uid
            state.name = action.payload.name
        },
    },


})
export const {isLogin, isData} = authSlice.actions
export default authSlice.reducer

