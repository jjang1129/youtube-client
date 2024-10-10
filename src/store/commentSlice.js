// 필수
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 내가 만든 API
import { addComment, viewComments } from "../api/comment";

// 액션함수 정의

export const createComment = createAsyncThunk(
  "comment/createComment",

  async (data) => {
    const response = await addComment(data);
    return response.data;
  }
);

export const fetchComments = createAsyncThunk(
  "comment/viewComments",
  async (videoCode) => {
    const response = await viewComments(videoCode);
    return response.data;
  }
);
// 비동기처리 슬라이스 만들기

const commentSlice = createSlice({
  name: "comment",
  initialState: { comments: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export default commentSlice;
