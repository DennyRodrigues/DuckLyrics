import { useContext, useState } from "react";
import ContextSearch from "../store/ContextSearch";
import styles from "./SearchForm.module.css";

const SearchForm = (props) => {
  // Hold the input value, it will update everytime the user enter a new keystroke
  const [songTitle, setSongTitle] = useState("");

  const contextSearch = useContext(ContextSearch);

  // When the user submit the form
  const submitHandler = (event) => {
    event.preventDefault();
    let songTitleSubmited = songTitle;
    contextSearch.search(songTitleSubmited);
    setSongTitle("");
  };
  // Update everytimte the user changes the form
  const updateSongTitle = (event) => {
    setSongTitle(event.target.value);
  };

  return (
    <form className={styles.SearchForm} onSubmit={submitHandler}>
      <label> Search for lyrics </label>
      <input
        type="text"
        onChange={updateSongTitle}
        value={songTitle}
        autoFocus={true}
      />
      <button type="submit">Search</button>
    </form>
  );
};
export default SearchForm;
