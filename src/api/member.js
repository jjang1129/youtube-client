import axios from "axios";

// 공통인 기본  URL 설정하기
const instance = axios.create({
  baseURL: "http://localhost:8080/api/member/",
});

// 데이터를 제이슨형태로 바디로 보내는 경우에는 data를 이렇게 입력한다
// 메서드방식은 instance. 뒤에
export const signup = async (data) => {
  return await instance.post("signup", data);
};

export const login = async (data) => {
  try {
    return await instance.post("login", data);
  } catch {
    new Error("LOGIN FAIL");
  }
};
