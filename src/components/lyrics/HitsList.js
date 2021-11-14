import { useState, useEffect, useContext, useRef, useCallback } from "react";
import ContextSearch from "../store/ContextSearch";
import HitPreview from "./HitPreview";
import styles from "./HitsList.module.css";
import Spinner from "../layout/Spinner";
import DuckIcon from "../icon/DuckIcon";

function LyricsList() {
  const contextSearchResult = useContext(ContextSearch);
  const [hitsList, setHitsList] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const observerLast = useRef();
  const lastSongElementRef = useCallback(
    (node) => {
      let options = {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0
      }
      if (observerLast.current) observerLast.current.disconnect();
      observerLast.current = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0) {
            setIsLoadingMore(true)
          }
        })

        }, options)
      if (node) observerLast.current.observe(node)
    }, [])

    useEffect(() => {
      if (!isLoadingMore) return
      if (!contextSearchResult.isLastPage){
        contextSearchResult.loadMore();
      }
     setIsLoadingMore(false);
     
    }, [isLoadingMore, contextSearchResult])
  //  Using the context component, add the songs to  HitsList the first time the component render, and  Load more songs when the user gets to the end of the page.
  useEffect(() => {
    setHitsList(contextSearchResult.songs.trackList);
  }, [contextSearchResult]);

  if (hitsList) {
    return (
      <div className={styles.HitListContainer}>
      <div className={styles.HitList}>
        {hitsList.map((hit, index) => {
          if (index === hitsList.length - 8) {
            return (
              <div ref={lastSongElementRef} key={`${hit.result.id}-container`}>
                <HitPreview hit={hit.result} key={hit.result.id} />
              </div>
            );
          } else {
            return <HitPreview hit={hit.result} key={hit.result.id} />;
          }
        })}
        </div>
        <div className={styles.LoaderContainer}>
        {contextSearchResult.isLoading ? (
          <div>
            ...Loading More songs <DuckIcon></DuckIcon>
          </div>
        ) : (
          <div></div>
        )}
        {contextSearchResult.isLastPage ? (
          <div> No More songs Found ;-;</div>
        ) : (
          <div></div>
        )} 
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default LyricsList;
