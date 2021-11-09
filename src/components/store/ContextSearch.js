import react, { useState, useEffect } from "react";
import  { listofWords }  from "./listOfWords.js";



const acessToken = "H7mOLK-kQTzhEeNG2dREp4qwUCnqZnpiwUbQWPSe5PvvlynHK0zKVjJU9Sa-0rxM";



let randomNum = Math.floor(Math.random() * 999);
const randomQuery = listofWords[randomNum];
const ContextSearch = react.createContext({
  songs: {
    trackList: [],
    heading: "Random Songs",
  },
  search: () => {},
  loadMore: () => {}
});

export const ContextSearchProvider = (props) => {
  const [searchResponse, setSearchResponse] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentQuery, setCurrentQuery] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isLastPage, setIsLastPage] = useState(false)

    const getSongsResponse = (query, pageNum) => {
    fetch(`http://api.genius.com/search?q=${query}&per_page=15&page=${pageNum}&access_token=${acessToken}`)
      .then((res) => res.json())
      .then((res) => {
        setSearchResponse((prev) => [...prev, ...res.response.hits]);
        setIsLoading(false);
        if (res.response.hits.length === 0){
          setIsLastPage(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // This will be used in the searchForm to search a new songs result using the new search query in the input from the user.
  const searchNewQuery = (query) => {
    setIsLastPage(false);
    setSearchResponse([]);
    setCurrentQuery(query);
    getSongsResponse(query, 1);
    setPageNumber(1);
  }
  // This will search more songs using the current query, it will be called in the hitList to fetch more songs when the user reach the end of the page
  const loadMore = () => {
    getSongsResponse(currentQuery, (pageNumber + 1));
    setPageNumber(prev => prev + 1);
    setIsLoading(true)
  }
  useEffect(() => {
    getSongsResponse(randomQuery, 1);
    setCurrentQuery(randomQuery)
  }, []);
  

  return (
    <ContextSearch.Provider
      value={{
        songs: {
          trackList: searchResponse,
          heading: 'songs',
          pageNumber: pageNumber
        },
        search: searchNewQuery,
        loadMore: loadMore,
        isLoading: isLoading,
        isLastPage: isLastPage
      }}
    >
      {props.children}
    </ContextSearch.Provider>
  );
};

export default ContextSearch;
