import { createSlice } from "@reduxjs/toolkit";

// 툴킷 방식

// createSlice로 리듀서를 만듬
const countSlice = createSlice({
  name: "counts", // 슬라이스명
  initialState: { count: 0 }, // 초기상태값
  reducers: {
    // 액션함수들 정의
    increase: (state) => {
      state.count += 1;
    },
    decrease: (state) => {
      state.count -= 1;
    },
  },
});
// 액션함수들 바깥에서 쓸수있도록 export 함
export const { increase, decrease } = countSlice.actions;

export default countSlice;
