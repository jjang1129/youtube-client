import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addsub, remove, countSub, getSub } from "../api/Subscribe";

// 액션함수들 정의
// 리턴값이 페이로드로 전달되는 형태

export const subscribe = createAsyncThunk(
  "subscribe/subscribe",
  async (data) => {
    const response = await addsub(data);
    return response.data;
  }
);

export const unsubscribe = createAsyncThunk(
  "subscribe/unsubscribe",
  async (subCode) => {
    const response = await remove(subCode);
    return response.data;
  }
);

export const subCount = createAsyncThunk(
  "subscribe/subCount",
  async (channelCode) => {
    const response = await countSub(channelCode);
    return response.data;
  }
);

export const fetchSub = createAsyncThunk(
  "subscribe/fetchSub",
  async (channelCode) => {
    const response = await getSub(channelCode);
    return response.data;
  }
);

// 비동기처리 슬라이스 만들기
const subscribeSlice = createSlice({
  name: "subscribe", // 슬라이스명
  initialState: {
    isSub: false,
    count: 0,
    sub: null,
  },
  reducers: {}, // 순서때문에 명시
  // 비동기처리하는 애들
  extraReducers: (builder) => {
    builder // fulfilled 성공 , pending 대기 중
      .addCase(subscribe.fulfilled, (state) => {
        state.isSub = true;
        state.count += 1;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.isSub = false;
        state.count -= 1;
      }) // 구독자수를 체크 => 구체적인 결과값이 필요한 상황 => action의 payload를 사용
      .addCase(subCount.fulfilled, (state, action) => {
        state.count = action.payload;
      }) // 구독자인지 아닌지 체크
      .addCase(fetchSub.fulfilled, (state, action) => {
        if (action.payload === "") {
          state.sub = null;
          state.isSub = false;
        } else {
          state.sub = action.payload;
          state.isSub = true;
        }
      }) // 에러처리
      .addCase(fetchSub.rejected, (state) => {
        state.isSub = false;
        state.sub = null;
      });
  },
});

export default subscribeSlice;
