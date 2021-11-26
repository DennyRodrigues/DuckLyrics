import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import styles from "./ArtistPage.module.css";

const ArtistPage = () => {
  const [artistData, setArtistData] = useState("");
  const { id } = useParams();
  const acessToken =
    "4nc-gD-74q1PZMHoTTYG9dqxnPNcqsYmLAvnv7D6NrurElCBikEwrEKcIWXIU2qD";
  // Fetch data after the page is render.
  useEffect(() => {
    // Get Artist information
    fetch(
      `https://api.genius.com/artists/${id}?access_token=${acessToken}&text_format=plain`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // Update Artist Data
        setArtistData(res.response.artist);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (artistData) {
    return (
      <div className={styles.ArtistPage}>
        <h1>{artistData.name}</h1>
          <div className={styles.ImgWrapper}>
            <img src={artistData.image_url} alt="Artist" />
          </div>
        <div className={styles.about}>
          <h2> About</h2>
          <pre>{artistData.description.plain}</pre>
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default ArtistPage;
