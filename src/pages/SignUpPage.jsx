import React, { useState, useEffect } from "react";
import classes from "./SignUpPage.module.css";
import useInputs from "../lib/hooks/useInputs";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useInputs({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (!signUpData.email.includes("@")) {
      setEmailError("이메일에는 @가 포함되어야 합니다.");
    } else {
      setEmailError("유효한 이메일 입니다 :)");
    }
  }, [signUpData]);

  return (
    <>
      <form className={classes.form}>
        <h1>회원가입</h1>
        <input
          name="email"
          className={classes.input}
          type="text"
          placeholder="이메일을 입력해주세요"
          id="email"
          value={signUpData.email}
          onChange={setSignUpData}
          data-testid="email-input"
        />
        {emailError && <div className={classes.error}>{emailError}</div>}

        <input
          name="password"
          className={classes.input}
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={signUpData.password}
          onChange={setSignUpData}
          data-testid="password-input"
        />

        <button data-testid="signup-button">회원가입</button>
      </form>
    </>
  );
};

export default SignUpPage;
