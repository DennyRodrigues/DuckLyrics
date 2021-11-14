import { useState, useEffect, useContext, useRef, useCallback } from "react";
import ContextSearch from "../store/ContextSearch";
import HitPreview from "./HitPreview";
import styles from "./HitsList.module.css";
import Spinner from "../layout/Spinner";
import DuckIcon from "../icon/DuckIcon";


function LyricsList() {
  const contextSearchResult = useContext(ContextSearch);
  const [hitsList, setHitsList] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef()


  const lastSongElementRef = useCallback(node => {
    // Define the options in IntersectionObserver(The event will be tigger a little before the user actually reaches the end of the page)
    let options = {
      root: null,
      rootMargin: '40px',
      threshold: 0
    }
    
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsLoadingMore(true);
        console.log('works')
      }
    }, options)
    if (node) observer.current.observe(node)
  }, [])

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

  //  Using the context component, add the songs to  HitsList the first time the component render, and  Load more songs when the user gets to the end of the page.
  useEffect(() => {
      setHitsList(contextSearchResult.songs.trackList)

  }, [contextSearchResult]);

  if (hitsList) {
    return (
      <div className={styles.HitList}>
        {hitsList.map((hit, index) => {
          if (hitsList.length === index + 1) {
            return <div ref={lastSongElementRef} key="lastElementContainerRef"><HitPreview hit={hit.result} key={hit.result.id}/></div>
          }
          return <HitPreview hit={hit.result} key={hit.result.id} />
        }
        )}
        {contextSearchResult.isLoading ? <div>...Loading More songs <DuckIcon></DuckIcon></div>: <div></div>}
        {contextSearchResult.isLastPage? <div> No More songs Found ;-;</div>: <div></div>}
      </div>
      
    );
  } else {
    return <Spinner />;
  }
}

export default LyricsList;
