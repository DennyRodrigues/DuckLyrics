import { Fragment } from "react";
import styles from './SideBlocks.module.css'

function SideBlocks(props) {
    return (
        <Fragment>
        <div className={`${styles.LeftBlock}  ${styles.Blocks}`}></div>
        <div className={`${styles.RightBlock}  ${styles.Blocks}`}></div>
        </Fragment>
     );
}

export default SideBlocks;