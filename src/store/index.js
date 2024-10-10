import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./CountSlice";
import subscribeSlice, { subscribe } from "./subscribeSlice";
import commentSlice from "./commentSlice";
// 리덕스 스토어 : 모든 상태를 관리하는 중앙 저장소 (만든 슬라이스애들을 넣어야함)

const store = configureStore({
  reducer: {
    // 여러개의 슬라이스들을 등록할때는 각각의 KEY를 등록합니다
    count: countSlice.reducer,
    subscribe: subscribeSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
