import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
const LoginSuccess = () => {
  const { login } = useAuth();
  // URL에서 토큰 추출
  // 토큰 로컬 스토리지에 저장

  // 메인 페이지로 이동
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;

    login(urlParams.get("token"));
    navigate("/");
  }, []);

  return null;
};
export default LoginSuccess;
