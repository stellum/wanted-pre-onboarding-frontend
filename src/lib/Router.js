import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import classes from "./Router.module.css";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

const Router = () => {
  return (
    <BrowserRouter>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <Link to="/" className={classes.a}>
            홈
          </Link>
          <Link to="/signin" className={classes.a}>
            로그인
          </Link>
          <Link to="/signup" className={classes.a}>
            회원가입
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" name="Home" element={<HomePage />} />
        <Route path="/signin" name="로그인" element={<SignInPage />} />
        <Route path="/signup" name="회원가입" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
