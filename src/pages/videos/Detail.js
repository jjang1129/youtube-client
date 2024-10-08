import "../../assets/detail.css";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import {
  initState as videoState,
  videoReducer,
  fetchVideo,
  fetchVideos,
} from "../../reducers/videoReducer";
import { addsub, count, findSub, getsub, remove } from "../../api/Subscribe";
import {
  initState as subscribeState,
  subscribe,
  unsubscribe,
  subCount,
  subscribeReducer,
  fetchSub,
} from "../../reducers/subscribeReducer";
import { useAuth } from "../../contexts/AuthContext";

const Detail = () => {
  // const { token } = useAuth();
  const { videoCode } = useParams();

  const [state, dispatch] = useReducer(videoReducer, videoState); // 별칭사용

  const [subState, subDispatch] = useReducer(subscribeReducer, subscribeState);

  // 3. useReducer(리듀서 함수 , 초기상태 ) 훅을 사용하여 상태(state)와 디스패치(dispatch)를 관리
  // -dispatch : 액션을 리듀서로 보내는 함수로 , 액션 객체를 인자로 받는다

  // 구조분해 할당
  const { video, videos } = state;
  const { isSub, count, sub } = subState;
  const [token, setToken] = useState();

  // 비디오 상세보기 + 오른쪽에 추천 비디오 리시트 띄우는거
  // 페이지 로드시 바로 나오는 기능임
  useEffect(() => {
    fetchVideo(dispatch, videoCode);
    fetchVideos(dispatch, 1, "");
    setToken(localStorage.getItem("token"));
  }, []);

  // 페이지 로드 -> 비디오 생성 -> 구독자수 카운트 + 구독여부 판별
  useEffect(() => {
    if (video != null) {
      subCount(subDispatch, video.channel.channelCode);

      if (token != null) {
        fetchSub(subDispatch, video.channel.channelCode);
      }
    }
  }, [video]);

  // 구독 or 구독 취소 버튼 눌렀을때 !
  const handbleSub = async () => {
    if (isSub) {
      //구독중 -> 구독 취소
      console.log(isSub);
      console.log("구독취소" + sub);
      unsubscribe(subDispatch, sub.subCode);
    } else {
      //구독 -> 구독
      console.log(isSub);
      console.log("구독");
      subscribe(subDispatch, { channelCode: video.channel.channelCode });
      console.log(sub);
    }
  };

  /*
   const [subCount, setSubCount] = useState();
  const [subscribe, setSubscribe] = useState({
    id: "",
    channelCode: 0,
  });


  // 구독여부 판별  함수
  const rnehr = async () => {
    // findsub에 id와 채널코드를 보냄 보내서
    // 0아니면 다른 숫자를 받아서 subCode에 Set
    const result = await findSub(
      localStorage.getItem("id"),
      video?.channel.channelCode
    );

    setSubCode(result.data);
  };

  // 비디오가 나온경우 subscribe 객체에 값들 저장 후
  // 구독여부 판별 함수와 구독자수 세는 함수 실행
 

  // 구독자수 세는 함수
  // 채널코드를 보내서 쿼리문 실행 후 결과값을 subCount에 세팅 후 결과값 반환
  const countSub = async () => {
    const result = await countSub(video?.channel.channelCode);
    console.log(result.data);
    setSubCount(result.data);
  };

  // 구독
  // 구독버튼 누를시 실행  페이지 로드 -> 비디오 로드 -> 후에 생성된 subscribe 객체를 create로 전송 !
  // 구독자수 세는 함수도 실행
  // 구독여부 판별함수도 실행
  const sub = async () => {
    const result = await addsub(subscribe);
    countSub();
    rnehr();
  };
  // 구독 취소
  // 구독버튼 누를시 실행  페이지 로드 -> 비디오 로드 -> 후에 생성된 subscribe 객체를 create로 전송 !
  // 구독자수 세는 함수도 실행
  // 구독여부 판별함수도 실행
  const subCancle = async () => {
    const result = await remove(subCode);
    countSub();
    setSubCode(0);
  };
*/
  // video? 로 접근하면 null에러 안뜸 !
  return (
    <main className="detail">
      <div className="video-detail">
        <video controls src={video?.videoUrl}></video>

        <h2>{video?.videoTitle}</h2>
        <div className="video-detail-desc">
          <div className="detail-desc-left">
            <img src={video?.channel.channelImg} />
            <div className="channel-desc">
              <h3>{video?.channel.channelName}</h3>
              <p>구독자 {count} 명</p>
            </div>

            <button onClick={handbleSub}>{isSub ? "구독중" : "구독"} </button>
          </div>
        </div>
        <div className="video-detail-info">{video?.videoDesc}</div>
      </div>

      <div className="video-list">
        {videos.map((video1) => (
          <a
            href={`/video/${video1.videoCode}`}
            className="video-list-card"
            key={video1.videoCode}
          >
            <img src={video1.videoImg} />
            <div className="video-list-desc">
              <h4>{video1.videoTitle}</h4>
              <p>{video1.channel.channelName}</p>
              <p className="video-meta">조회수 {video1.videoCount}회</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};
export default Detail;
