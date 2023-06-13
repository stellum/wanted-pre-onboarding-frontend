import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import classes from "./Router.module.css";
import HomePage from "../Pages/Home/HomePage";
import SignInPage from "../Pages/SignIn/SignInPage";
import SignUpPage from "../Pages/SignUp/SignUpPage";
import TodoPost from "../Pages/Todo/TodoPost";

const Router = () => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  console.log(loggedIn, "login");

  return (
    <BrowserRouter>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <Link to="/" className={classes.a}>
            홈
          </Link>
          <Link to="/todo" className={classes.a}>
            Todo
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
        <Route
          path="/signup"
          name="회원가입"
          element={loggedIn ? <TodoPost /> : <SignUpPage />}
        />

        <Route
          path="/signin"
          name="로그인"
          element={loggedIn ? <TodoPost /> : <SignInPage />}
        />
        <Route
          path="/todo"
          name="Todo"
          element={!loggedIn ? <SignInPage /> : <TodoPost />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
