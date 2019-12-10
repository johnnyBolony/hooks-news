import React , { useState , useEffect , useRef }from 'react';
import axios from 'axios';
import classes from './App.css';

export default function App(){

  const [results,setResults] = useState([]);
  const [query,setQuery] = useState("react hooks");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const searchInputRef = useRef();

useEffect( ()=> {
  getResults();
  },[]  );

const getResults = async () => {
  try{
    setLoading(true);
    const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    setResults(response.data.hits);
  }catch(err){
    setError(err);
  }
  
  setLoading(false);
}

const handleSearch = event=> {
  event.preventDefault();
  getResults();
}

const handleClearSearch = ()=>{
  setQuery("");
  searchInputRef.current.focus();
}

  return(
    <>
    <div className="container 
    max-w-md mx-auto 
    p-4 m-2 
    bg-purple-200" style={classes}>
      <h1 className="text-grey-light
      font-thin
      text-5xl
      ">HookSearch</h1>
    <form className="
    mb-2
    " action="" onSubmit={handleSearch}>
    <input 
        type="text" 
        onChange={ event => setQuery(event.target.value)}
        value={query}
        ref={searchInputRef}
        className="
        border p-1 rounded
        "
        />
        <button className="
        bg-orange-500 rounded m-1 p-1
        " type="submit" >Search</button>
        <button className="
        bg-teal-500
        rounded m-1 p-1
        text-white
        " type="button" onClick={handleClearSearch}>Clear</button>
        </form>
    {loading? <div className="font-bold text-orange-600">Loading Results...</div> : (<ul>
    {
      results.map(result => (
        <li key={result.objectID}>
          <a className="
            text-indigo-600 
            hover:text-indigo-800
          " href={result.url}>{result.title}</a>
          </li>
      ))
    }
    </ul>)}
  {error && <div className="text-red-500 font-bold">{error.message}</div>}
    </div>
    </>

  )
}