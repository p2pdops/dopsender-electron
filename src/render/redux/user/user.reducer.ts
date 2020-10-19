import { createAction, createReducer } from "@reduxjs/toolkit";


interface state {
  user_name: string;
  user_dp: string;
}

const initialState: state = {
    user_name: 'Desktop User',
    user_dp: 'boy1'
};

const userReducer = createReducer(initialState, {});

export default userReducer;
