import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const create = async (data) => {
  console.log("도착후");
  console.log(data);
  return await instance.post("sub", data);
};

export const remove = async (subCode) => {
  return await instance.delete(`sub/${subCode}`);
};

export const count = async (channelCode) => {
  return await instance.get(`sub/${channelCode}/count`);
};

export const findSub = async (id, channelCode) => {
  console.log("코드 뽑아내는곳 도착");
  console.log("id : " + id + "채널코드 : " + channelCode);
  return await instance.get(`sub?id=${id}&channelCode=${channelCode}`);
};
