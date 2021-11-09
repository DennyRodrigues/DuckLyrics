import {useContext, useState} from 'react';
import ContextSearch from '../store/ContextSearch';
import styles from './SearchForm.module.css'

function SearchForm(props) {
  const [songTitle, setSongTitle] = useState('')
  const contextQuery =  useContext(ContextSearch);
  const submitHandler = (event) => {
     event.preventDefault();
     let songTitleSubmited = songTitle;
     contextQuery.search(songTitleSubmited);
     setSongTitle("");
  }
  const updateSongTitle = (event) => {
    setSongTitle(event.target.value)
  }

  return (
    <form className={styles.SearchForm} onSubmit={submitHandler}>
      <label> Search for lyrics </label>
      <input type="text" onChange={updateSongTitle} value={songTitle} />
      <button type="submit">Search</button>
    </form>
  );
}
export default SearchForm;
