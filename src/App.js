import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from "./components/auth";
import {db } from "./config/firebase";
import { getDocs, collection , addDoc , deleteDoc, doc} from "firebase/firestore"


function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db,"movies")

  //New movie states

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(true);

  const deleteMovie = async(id) => {
    const movieDoc = doc(db, "movies" , id)
    await deleteDoc(movieDoc);

  }

  const getMovieList = async () => {
    try {
    const data = await getDocs(moviesCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id : doc.id
    }));
    setMovieList(filteredData);
    }
    catch(err){
      console.error(err);
    }
  };

  useEffect(()=>{
    

    getMovieList();

  },[]);


  const onSubmitMovie =async() => {
    try{
    await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
    }) ; 

    getMovieList();
  }
  catch(err) {
    console.error(err)
  }
  };

  return (
    <div className="App">
    <Auth/>

    <div>
      <input placeholder='Movie title...'
      onChange={(e) => setNewMovieTitle(e.target.value)}
      /><br/>
      <input placeholder='Release Date...' type='number'
      onChange={(e) => setNewReleaseDate(e.target.value)}
      /><br/>
      <input type="checkbox"
      checked ={isNewMovieOscar}
      onChange={(e) => setIsNewMovieOscar(e.target.checked)}
       />
      <label> Received an oscar</label><br/>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>

    <div>
      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red"}}> {movie.title} </h1>
          <p> Date : {movie.releaseDate}</p>
          <button onClick={()=>deleteMovie(movie.id)}>Delete Movie</button>
          </div>
      )
      
      )}
    </div>
    
    </div>
  );
}

export default App;
