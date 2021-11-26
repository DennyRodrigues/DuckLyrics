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
  const [duckTranslation, setDuckTranslation] = useState("");
  const [englishTranslation, setEnglishTranslation] = useState("");
  const [albumTrackList, setAlbumTrackList] = useState();
  const acessToken =
    "H7mOLK-kQTzhEeNG2dREp4qwUCnqZnpiwUbQWPSe5PvvlynHK0zKVjJU9Sa-0rxM";
  const WebPageurl = songData.url;
  const albumUrl = songData?.album?.api_path;
  // Get the lyrics and song information after the component is render.
  useEffect(() => {
    //Get lyrics and album information of the song after the song information is fetched.
    if (WebPageurl) {
      // Get the Lyrics
      getLyrics(
        `https://add-cors-to-requests.denny-rodrigues-carmo.workers.dev/?${WebPageurl}`
      ).then((lyrics) => {
        setLyrics(lyrics);
        setEnglishTranslation(lyrics);
      });

      // Get the information about the album
      fetch(
        `https://api.genius.com${albumUrl}/tracks?access_token=${acessToken}`,
        {
          method: "Get",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setAlbumTrackList(res.response);
        })
        .catch((err) => console.log(err));
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
  }, [id, WebPageurl, albumUrl]);
  // Replace the lyrics text with duck language (All words will be replace with quack). It will also change the button so  when the user click again the lyrics will be back to english.
  const translateToDuck = () => {
    let translation = lyrics.replace(/\w+/g, "quack");
    setLyrics(translation);
    setDuckTranslation(true);
  };
  const translateToEnglish = () => {
    setDuckTranslation("");
    setLyrics(englishTranslation);
  };

  if (songData) {
    // Filter to get only the youtube Link from the  API response(This is needed beacause the API gives different medias links, like spotify and others)
    const youtubeLink = songData.media.filter(
      (song) => song.provider === "youtube"
    )[0];
    // Replace to make a youtuber embbed link instead of a watch(This will allow the url to be placed  in the inframe tag).
    var youtuberLinkEmbed = "";
    if (youtubeLink) {
      youtuberLinkEmbed = youtubeLink.url.replace("watch?v=", "embed/");
      youtuberLinkEmbed = youtuberLinkEmbed.replace("http", "https");
    }
    return (
      <div className={styles.LyricPage}>
        <h1>{songData.title}</h1>
        <div className={styles.LyricPageInfoBox}>
          <img
            src={songData.song_art_image_thumbnail_url}
            alt="Song thumbnail"
          />
          <ul>
            <li>
              Title: <span> {songData?.title} </span>
            </li>
            <li>
              Album: <span> {songData.album?.name} </span>
            </li>
            <li>
              Release: <span> {songData?.release_date_for_display} </span>
            </li>
            <li>
              Artist: <span> {songData.primary_artist?.name} </span>
            </li>
            <li>
              <button>
                <Link
                  to={`/artist/${songData.primary_artist.id}`}
                  className="Link"
                >
                  More About Artist
                </Link>
              </button>
            </li>
          </ul>
        </div>
        {youtuberLinkEmbed ? (
          <div className={styles.YoutubeContainer}>
            <iframe src={youtuberLinkEmbed} title="youtuber"></iframe>
          </div>
        ) : (
          null
        )}
        {albumTrackList?
        <aside className={styles.AlbumContainer}>
          <span className={styles.AlbumSubText}> More songs of the same album: </span>
          <h3 className={styles.AlbumTitle}>{songData.album?.name}</h3>
          <ul className={styles.AlbumList}>
            {albumTrackList.tracks.map((song) =>{
              return (<li key={song.song.id} className={styles.AlbumItem}
              > <span>&#9834;</span> <Link
                to={`/lyrics/${song.song.id}`}
                className="Link"
              >
                {song.song.title}
                </Link></li>)
            })}
          </ul>
        </aside>:null}
        <div className={styles.LyricsBox}>
          <h2>Lyrics</h2>
          {duckTranslation ? (
            <button onClick={translateToEnglish}>
              Translate to Human Language
            </button>
          ) : (
            <button onClick={translateToDuck}>
              Translate to Duck Language
            </button>
          )}
          {lyrics ? (
            <pre> {lyrics} </pre>
          ) : (
            <div>
              Loading Lyrics... <DuckIcon />{" "}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default LyricPage;
