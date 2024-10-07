import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const getVideos = async (page, keyword = "") => {
  return await instance.get("video", {
    params: {
      page,
      keyword, // 키,값이 명칭이 같을 경우 생략가능
    },
  });
};

export const addVideo = async (data) => {
  return await instance.post("video", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
