import styles from "./HitPreview.module.css"
import { Link } from 'react-router-dom';

function HitPreview(props) {
    return (
      <div className={styles.HitPreview}>
        <p className={styles.hitPreviewTitle}>Title: {props.hit.title} </p>
        <p className={styles.hitPreviewArtist}>Artist: {props.hit.primary_artist.name}</p>
        <Link to={`lyrics/${props.hit.id}`} className="Link">
          <button>See Lyrics</button>
        </Link>
      </div>
    );
}

export default HitPreview;