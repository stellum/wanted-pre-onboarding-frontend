import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientServer } from "../../context/baseUrl";
const LOGIN_URL = "/auth/signin";

const SignIn = () => {
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

  const handleLogin = async () => {
    try {
      const response = await clientServer.post(LOGIN_URL, {
        email: input.email,
        password: input.password,
      });

      if (response.status === 200) {
        const token = response?.data?.access_token;
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true);
        alert("로그인이 완료되었습니다");
        navigate("/todo");
      } else {
        alert(
          "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
        );
      }
    } catch (error) {
      alert(
        "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      );
      console.error(error);
    }
  };

  // const signOut = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("isLoggedIn");
  //   window.location.href("/signin");
  // };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/todo");
    }
  }, []);

  return (
    <>
      <section>
        <h1>로그인</h1>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          data-testid="email-input"
          onChange={handleInput}
          value={input.email}
          placeholder="email"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          onChange={handleInput}
          value={input.password}
          placeholder="password"
          required
        />
        <button
          data-testid="signin-button"
          onClick={handleLogin}
          disabled={!validEmail || input.password?.length < 8}
        >
          로그인
        </button>

        <p>
          계정이 없으신가요?
          <a href="/signup"> 회원가입</a>
        </p>
      </section>
    </>
  );
};

export default SignIn;
