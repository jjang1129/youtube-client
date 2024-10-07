import { getVideo, getVideos } from "../api/video";
// 1.  초기 상태

export const initState = {
  video: null, // 1개
  videos: [], // 목록
};

// 2. 리듀서 함수
// 상태(state)와 액션(action)을 받아 상태들을 업데이트하는 역할
// - state : 현재 상태
// -action :  상태를 어떻게 변경할지 정의한 객체, 주로 type으로 구분
//         switch문을 사용하여, action의 type에 따라 상태를 다르게 처리

// 액션 함수들의 정의를 따로 한다
// 디스패치를 통해서 액션을?
export const fetchVideo = async (dispatch, videoCode) => {
  const response = await getVideo(videoCode);
  dispatch({ type: "FETCH_VIDEO", payload: response.data }); // 응답 데이터는 payload로
};
export const fetchVideos = async (dispatch, page, keyword) => {
  const response = await getVideos(page, keyword);
  dispatch({ type: "FETCH_VIDEOS", payload: response.data });
};

export const videoReducer = (state, action) => {
  // 리듀서 내에서는 asyn await 사용 불가함

  switch (action.type) {
    case "FETCH_VIDEO":
      return { ...state, video: action.payload }; // 기존값들 뿌리고 다시 세팅
    case "FETCH_VIDEOS":
      return { ...state, videos: action.payload };
  }
};
