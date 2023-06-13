import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.container}>
      <p className={classes.title}>
        2023 원티드 프리온보딩
        <br />
        프론트엔드 인턴쉽 선발과제
      </p>
    </div>
  );
};

export default HomePage;
