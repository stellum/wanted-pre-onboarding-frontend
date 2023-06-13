import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Todos</h1>
      <p className={classes.text}>
        2023 원티드 프리온보딩
        <br />
        프론트엔드 인턴쉽 선발 과제
      </p>
      <Link to="/todo">
        <button className={classes.btn}>Get Started</button>
      </Link>
    </div>
  );
};

export default HomePage;
