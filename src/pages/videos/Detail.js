import "../../assets/detail.css";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import {
  initState as videoState,
  videoReducer,
  fetchVideo,
  fetchVideos,
} from "../../reducers/videoReducer";
import { count, create, findSub, remove } from "../../api/Subscribe";

const Detail = () => {
  const { videoCode } = useParams();

  const [state, dispatch] = useReducer(videoReducer, videoState); // 별칭사용

  const { video, videos } = state;
  const [subCode, setSubCode] = useState();

  const [subCount, setSubCount] = useState();

  const [subscribe, setSubscribe] = useState({
    id: "",
    channelCode: 0,
  });

  // 비디오 상세보기 + 오른쪽에 추천 비디오 리시트 띄우는거
  useEffect(() => {
    fetchVideo(dispatch, videoCode);
    fetchVideos(dispatch, 1, "");
  }, []);

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
  useEffect(() => {
    if (video != undefined) {
      setSubscribe({
        id: localStorage.getItem("id"),
        channelCode: video?.channel.channelCode,
      });

      rnehr();
      countSub();
    }
  }, [video]);

  // 구독여부 세는 함수
  // 채널코드를 보내서 쿼리문 실행 후 결과값을 subCount에 세팅 후 결과값 반환
  const countSub = async () => {
    const result = await count(video?.channel.channelCode);
    console.log(result.data);
    setSubCount(result.data);
  };

  // 구독
  const sub = async () => {
    const result = await create(subscribe);
    countSub();
    rnehr();
  };
  // 구독 취소
  const subCancle = async () => {
    const result = await remove(subCode);
    countSub();
    setSubCode(0);
  };

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
              <p>구독자 수 : {subCount}</p>
            </div>

            {subCode === 0 ? (
              <button type="button" onClick={sub}>
                구독
              </button>
            ) : (
              <button type="button" onClick={subCancle}>
                구독취소
              </button>
            )}
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
