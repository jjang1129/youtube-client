import axios from "axios";

// 공통인 기본  URL 설정하기
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getVideos = async () => {
  return await instance.get("video");
};
