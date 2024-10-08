import { addsub, remove, countSub, getSub } from "../api/Subscribe";

// 서버에 있는거 api로 만들고 Reducer로  상태 관리하기

// 구독을 했을때  화면단이 바뀌는 값이 어딘지 확인

export const initState = {
  count: 0, // 구독자 수
  isSub: false, // 구독 체크 여부
  sub: null, // 구독객체 정보
};

// 액션함수들 정의 (보통 api 갯수만큼 만듬 )
export const subscribe = async (dispatch, data) => {
  const response = await addsub(data);
  dispatch({ type: "ADD_SUBSCRIBE" });
};

export const unsubscribe = async (dispatch, data) => {
  console.log(data);
  const response = await remove(data);
  dispatch({ type: "DELETE_SUBSCRIBE" });
};

export const subCount = async (dispatch, channelCode) => {
  const response = await countSub(channelCode);
  dispatch({ type: "COUNT_SUBSCRIBE", payload: response.data }); // 받아오는 구체적인 값이 있다 payload
};

export const fetchSub = async (dispatch, channelCode) => {
  const response = await getSub(channelCode);
  if (response.data !== "") {
    dispatch({ type: "FETCH_SUBSCRIBE", payload: response.data });
  } else {
    dispatch({ type: "FETCH_SUBSCRIBE_ERROR" });
  }
};

export const subscribeReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SUBSCRIBE":
      return {
        // 스프레드 연산자 그냥 기본적으로 깔고 가기
        ...state,
        isSub: true,
        count: state.count + 1,
        // 구독을 했을떄 변화되는값이 어떻게 변하는지 적기
      };
    case "DELETE_SUBSCRIBE":
      return {
        ...state,
        isSub: false,
        count: state.count - 1,
      };
    case "COUNT_SUBSCRIBE":
      return {
        ...state,
        count: action.payload,
        // 구독자 수를 세는 함수 실행시 변화되는값 -> 구독자 수 표기 -> 아까 payload에 담아놓은걸 꺼내오면됨
      };
    case "FETCH_SUBSCRIBE": // 구독중인지
      return {
        ...state,
        isSub: true,
        sub: action.payload,
      };
    case "FETCH_SUBSCRIBE_ERROR":
      return {
        ...state,
        isSub: false,
        sub: null,
      };
    default:
      return state;
  }
};
