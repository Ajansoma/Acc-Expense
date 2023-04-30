import { useState } from "react";
import Menu from "./Menu";
import styles from "./Header.module.css";

const Header = function (props) {
  const [menu, setMenu] = useState(false);

  const menuHandler = function () {
    setMenu((prevState) => !prevState);
  };

  const styledContainer = !menu ? styles.icon : styles["new-icon"];

  return (
    <div className={styles.container}>
      <div className={styledContainer}>
        <ion-icon name="menu-outline" onClick={menuHandler}></ion-icon>
      </div>
      {menu && <Menu />}
      <div></div>
    </div>
  );
};
export default Header;
