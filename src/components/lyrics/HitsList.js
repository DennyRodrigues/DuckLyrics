import { useState, useEffect, useContext } from "react";
import ContextSearch from "../store/ContextSearch";
import HitPreview from "./HitPreview";
import styles from "./HitsList.module.css";
import Spinner from "../layout/Spinner";
import DuckIcon from "../icon/DuckIcon";


function LyricsList() {
  const contextSearchResult = useContext(ContextSearch);
  const [hitsList, setHitsList] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Check if user reach the end of the page
  const  handleScroll = () => {
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
      setIsLoadingMore(true);
    }
};

  // Get more songs to the context component when the user reach the end of the page

  //Check if the user is requesting more song
  useEffect(() => {
    // Return and don't fetch more date if the user is not at the end of the page (isLoadingmore is false)
    if (!isLoadingMore) return
    // Fetch more songs using context if the user is on the end of the page. It will not fetch anymore if the context does not find anymore songs(var isLastPage is set false)
    if(isLoadingMore && !contextSearchResult.isLastPage){
      contextSearchResult.loadMore()
    }
    setIsLoadingMore(false);
  }, [isLoadingMore, contextSearchResult]);

  // Add Eventwhen user scroll, this event will call a function check if user reach the end of the page.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
  });
    return () => {
      document.body.removeEventListener('touchmove', handleScroll)
       window.removeEventListener("scroll", handleScroll);
      }
  }, []);

  //  Using the context component, add the songs to  HitsList the first time the component render, and  Load more songs when the user gets to the end of the page.
  useEffect(() => {
      setHitsList(contextSearchResult.songs.trackList)
      

  }, [contextSearchResult]);

  if (hitsList) {
    return (
      <div className={styles.HitList}>
        {hitsList.map((hit) => (
          <HitPreview hit={hit.result} key={hit.result.id} />
        ))}
        {contextSearchResult.isLoading ? <div>...Loading More songs <DuckIcon></DuckIcon></div>: <div></div>}
        {contextSearchResult.isLastPage? <div> No More songs Found ;-;</div>: <div></div>}
      </div>
      
    );
  } else {
    return <Spinner />;
  }
}

export default LyricsList;
