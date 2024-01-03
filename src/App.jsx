import { useEffect, useState } from 'react'
import Auth from "./components/Auth"
import {db} from './config/firebase';
import {addDoc, doc,collection, deleteDoc, getDocs, updateDoc} from 'firebase/firestore';
function App() {
  const [count, setCount] = useState(0)
  const [movieList,setMovieList] = useState([]);
  
  const moviesCollectioRef = collection(db,'movies');
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
  useEffect(()=>{
    getMovieList();
  },[])

    const deleteMovie = async(id)=>{
          const movieDoc = doc(db,'movies',id);
          await deleteDoc(movieDoc);
          getMovieList();
    }

    const updateTitle=async(id)=>{
        const movieDoc = doc(db,'movies',id);
        await updateDoc(movieDoc,{title:updateName})
        getMovieList()
    }

      const[newMovieTitle,setNewMovieTitle] = useState('');
      const[newMovieYear,setNewMovieYear] = useState(0);
      const[newMovieOscar,setNewMovieOscar] = useState(false);
      const[updateName,setUpdateName] = useState('');
      const newMovieSubmit = ()=>{
        try{
          addDoc(moviesCollectioRef,{title:newMovieTitle,year:newMovieYear,receivedOscar:newMovieOscar});
          getMovieList();
        }catch(err){
          console.error(err);
        }
      }
  return (
    <>
      <Auth/>
        <input type="text" placeholder='Enter Movie Name' onChange={(e)=>{setNewMovieTitle(e.target.value)}}/>
        <input type="number" placeholder='Enter Year' onChange={(e)=>{setNewMovieYear(e.target.value)}}/>
        <input type="checkbox" id='oscar' onChange={(e)=>{setNewMovieOscar(e.target.checked)}}/>
        <label htmlFor='oscar'>Reaceived Oscar</label>
        <button onClick={newMovieSubmit}>Submit</button>
      <div>{movieList.map((movie)=>(
        <>
        <h1 style={{color:movie.receivedOscar ?'green':'red'}}>{movie.title}</h1>
        <p>{movie.year}</p>
        <button onClick={()=>deleteMovie(movie.id)}> Delete</button>
        <input onChange={(e)=>setUpdateName(e.target.value)} type="text" placeholder='any updates' />
        <button onClick={()=>updateTitle(movie.id)}>UpdateTile</button>
        </>
      ))}</div>
    </>
  )
}

export default App
