import { useState, useEffect, useContext, useCallback } from "react";
import ContextSearch from "../store/ContextSearch";
import HitPreview from "./HitPreview";
import styles from "./HitsList.module.css";
import Spinner from "../layout/Spinner";
import DuckIcon from "../icon/DuckIcon";
import InfiniteScroll from 'react-infinite-scroll-component';

function LyricsList() {
  const contextSearchResult = useContext(ContextSearch);
  const [hitsList, setHitsList] = useState('');
  const [stillHasMorePages, SetStillHasMorePages] = useState(true);

  const loadMore = useCallback(node => {
    contextSearchResult.loadMore()
  }, [contextSearchResult])

  //  Using the context component, add the songs to  HitsList the first time the component render, and  Load more songs when the user gets to the end of the page.
  useEffect(() => {
    if(!contextSearchResult.isLastPage){
      setHitsList(contextSearchResult.songs.trackList)
    }
    else{
      SetStillHasMorePages(false);
    }

  }, [contextSearchResult]);
  //  trying to fix for mobiles::: https://github.com/ankeetmaini/react-infinite-scroll-component/issues/277
  useEffect(() => {
    const scrollable = document.querySelector(styles.HitList);
    scrollable.scrollTop = 0
    } ,[hitsList])

  if (hitsList) {
    return (
      <div className={styles.HitList}>
        {hitsList.map((hit, index) => {
          return <HitPreview hit={hit.result} key={hit.result.id} />
        }
        )}
        <InfiniteScroll
  dataLength={hitsList.length} //This is important field to render the next data
  next={loadMore}
  hasMore={stillHasMorePages}
  loader={<div>...Loading More songs <DuckIcon></DuckIcon></div>}
  endMessage={
    <div> <DuckIcon></DuckIcon> <span> No more songs found ;-; </span></div>
  }

>
</InfiniteScroll>
      </div>
      
      
    );
  } else {
    return <Spinner />;
  }
}


export default LyricsList;
