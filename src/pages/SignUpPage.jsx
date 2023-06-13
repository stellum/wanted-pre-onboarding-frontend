import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientServer } from "../lib/baseUrl";
const REGISTER_URL = "/auth/signup";

const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });
  const [validEmail, setValidEmail] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setValidEmail(value.includes("@"));
    }
    setInput({ ...input, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await clientServer.post(REGISTER_URL, {
        email: input.email,
        password: input.password,
      });

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다");
        localStorage.setItem("token", response.data.access_token);
        navigate("/todo");
      } else {
        alert(
          "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
        );
      }
    } catch (error) {
      alert("동일한 이메일이 이미 존재합니다. 로그인 페이지로 이동합니다.");
      navigate("/signin");
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/todo");
    }
  }, [navigate]);

  return (
    <>
      <section>
        <h1>회원가입</h1>
        <br />

        <input
          type="text"
          id="email"
          name="email"
          placeholder="이메일"
          data-testid="email-input"
          autoComplete="off"
          value={input.email}
          onChange={handleInput}
          required
        />

        <input
          name="password"
          placeholder="패스워드"
          data-testid="password-input"
          type="password"
          value={input.password}
          onChange={handleInput}
          required
        />
        <button
          data-testid="signup-button"
          onClick={handleSignUp}
          disabled={!validEmail || input.password?.length < 8}
        >
          회원가입
        </button>

        <p>
          계정이 있으신가요?
          <a href="/signin"> 로그인하기</a>
        </p>
      </section>
    </>
  );
};

export default SignUp;
