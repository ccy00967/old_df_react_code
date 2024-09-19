import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';


// reducer 와 reducers 구분 잘하기
// 리덕스에서 store는 한가지만 존재함
// 여러가지 store를 만들필요가 있음 -> store를 쪼갠것 같다고 해서 slice
// store는 slice들의 집합이다

// 사용자가 처음 접속했을때 userInfo 상태
const initialState = {
  success: false,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    getUserInfo: function (state, action) {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    // 사용자 정보삭제 == 로그아웃 담당
    builder.addCase(PURGE, () => initialState);
  },
})

export default userInfoSlice

// 아래처럼 작성시 다른 파일에서 import 할때 함수명만 작성가능
// import {up} from [여기 파일위치/counterSlice]
// dispatch(counterSlice.actions.up()) -> dispatch(up()) 으로 사용 가능
//export const { up } = counterSlice.actions
