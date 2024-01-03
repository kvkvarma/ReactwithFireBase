import { useEffect, useState } from 'react'
import Auth from "./components/Auth"
import {db} from './config/firebase';
import {collection, getDocs} from 'firebase/firestore';
function App() {
  const [count, setCount] = useState(0)
  const [movieList,setMovieList] = useState([]);
  
  const moviesCollectioRef = collection(db,'movies');
  useEffect(()=>{
    const getMovieList = async()=>{
      try{
        const data = await getDocs(moviesCollectioRef);
        const filterData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
        setMovieList(filterData)
      }
      catch(err){
        console.error(err);
      }
    }
    getMovieList();
  },[])

  return (
    <>
      <Auth/>
      <div>{movieList.map((movie)=>(
        <>
        <h1 style={{color:movie.receivedOscar ?'green':'red'}}>{movie.title}</h1>
        <p>{movie.year}</p>
        </>
      ))}</div>
    </>
  )
}

export default App
