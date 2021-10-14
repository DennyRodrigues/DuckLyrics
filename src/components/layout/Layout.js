import styles from "./Layout.module.css";
import NavBar from "./NavBar";
import SideBlocks from "./SideBlocks";

function Layout(props) {
  return (
    <div className={styles.Layout}>
      <NavBar /> <div className={styles.MainLayout}> {props.children} </div>
    </div>
  );
}

export default Layout;
