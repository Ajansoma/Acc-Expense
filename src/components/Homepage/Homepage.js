import { useState } from "react";
import Charts from "./Charts/Charts";
import styles from "./Homepage.module.css";
import Report from "./Reports/Reports";
import Revenue from "./Revenue/Revenue";
import Header from "./Revenue/Header";
import Menu from "./Menu";

const Homepage = function () {
  const [overlay, setOverlay] = useState(false);
  const overlayHandler = function () {
    setOverlay((prevState) => !prevState);
  };
  // const [clickedMenu, setClickedMenu] = useState(true);

  // const menuHandler = function (clicked) {
  //   setClickedMenu(!clicked);
  // };

  // const styledHome = clickedMenu ? `${styles.content}` : `${styles.home}`;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Revenue />
        <Charts />
        <Report />
      </div>
      {overlay && <div className={styles.overlay}></div>}
    </div>
  );
};
export default Homepage;
