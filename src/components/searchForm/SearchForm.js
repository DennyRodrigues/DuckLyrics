import {useState} from 'react';
import styles from './SearchForm.module.css'

function SearchForm(props) {
  const [songTitle, setSongTitle] = useState('')
  function submitHandler(event) {
     event.preventDefault();
     let songTitleSubmited = songTitle;
     setSongTitle('');

  }
  function updateSongTitle(event){
    setSongTitle(event.target.value)
  }

  return (
    <form className={styles.SearchForm}>
      <label> Search for lyrics </label>
      <input type="text" onChange={updateSongTitle}/>
      <button type="submit" onSubmit={submitHandler} 
      >Search</button>
    </form>
  );
}
export default SearchForm;
