import styles from "./Layout.module.css";
import NavBar from "./NavBar";
import SideBlocks from "./SideBlocks";
import { Outlet } from "react-router-dom";

function Layout(props) {
  return (
    <div className={styles.Layout}>
      <NavBar />
      <div className={styles.MainLayout}>
      <Outlet />
      </div>
      <div className={styles.Footer}></div>
    </div>
  );
}

export default Layout;
