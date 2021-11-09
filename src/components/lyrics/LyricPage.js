import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import styles from "./LyricPage.module.css";
import { getLyrics } from "genius-lyrics-api";
import DuckIcon from "../icon/DuckIcon";

function LyricPage(props) {
  const [songData, setSongData] = useState("");
  const { id } = useParams();
  const [lyrics, setLyrics] = useState("");
  const [duckTranslation, setDuckTranslation] = useState('');
  const [englishTranslation, setEnglishTranslation] = useState('');
  const acessToken =
    "H7mOLK-kQTzhEeNG2dREp4qwUCnqZnpiwUbQWPSe5PvvlynHK0zKVjJU9Sa-0rxM";
  const url = songData.url;
  // Get the lyrics and song information after the component is render. 
  useEffect(() => {
    //Get lyrics of the song
    if (url) {
      getLyrics(url).then((lyrics) => {
        setLyrics(lyrics);
        setEnglishTranslation(lyrics);
      });
    }
    //Get Songs information
    fetch(`https://api.genius.com/songs/${id}?access_token=${acessToken}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSongData(res.response.song);
        
      })
      .catch((err) => console.log(err));
  }, [id, url]);
  // Replace the lyrics text with duck language (All words will be replace with quack). It will also change the button so  when the user click again the lyrics will be back to english.
  const translateToDuck = () =>{
    let translation = lyrics.replace(/\w+/g, 'quack');
    setLyrics(translation);
    setDuckTranslation(true);
  }
  const translateToEnglish = () =>{
    setDuckTranslation('');
    setLyrics(englishTranslation);
  }


  if (songData) {
    // Filter to get only the youtube Link from the  API response(This is needed beacause the API gives different medias links(like spotify and others))
    const youtubeLink = songData.media.filter(
      (song) => song.provider === "youtube"
    )[0];
    // Replace to make a youtuber embbed link instead of a watch(This will allow the url to be placed  in the inframe tag). Change 
    var youtuberLinkEmbed = '';
    if (youtubeLink) {
      youtuberLinkEmbed = youtubeLink.url.replace("watch?v=", "embed/");
      youtuberLinkEmbed = youtubeLink.url.replace("http", "$&s");
    }
    return (
      <div className={styles.LyricPage}>
        <h1>{songData.title}</h1>
        <div className={styles.row}>
          <div className={styles.LyricPageInfoBox}>
            <img
              src={songData.song_art_image_thumbnail_url}
              alt="Song thumbnail"
            />
            <ul>
              <li>Title: <span>   {songData?.title} </span></li>
              <li>Album: <span>   {songData.album?.name} </span></li>
              <li>Release:  <span>  {songData?.release_date_for_display} </span></li>
              <li>Artist:  <span>  {songData.primary_artist?.name} </span></li>
              <li>
                 
                <button>
        <Link to={`/artist/${songData.primary_artist.id}`} replace className="Link"> More About Artist </Link>
        </button></li>
            </ul>
          </div>
          {youtuberLinkEmbed? <iframe
            width="420"
            height="315"
            src={youtuberLinkEmbed}
            title="youtuber"
          ></iframe>:<div></div>}
        </div>
        <div className={styles.LyricsBox}>
          <h2>Lyrics</h2>
          {duckTranslation? <button onClick={translateToEnglish}>Translate to English</button>: <button onClick={translateToDuck}>Translate to Duck Language</button> }
          {lyrics ? <pre> {lyrics} </pre> : <div>Loading Lyrics... <DuckIcon/> </div>}
        </div>
        
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default LyricPage;
