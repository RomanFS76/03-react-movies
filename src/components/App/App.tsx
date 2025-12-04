import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (query: string) => {
    try {
      const responce = await fetchMovies(query);

      if(responce.length === 0){
      toast('No movies found for your request.', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#fff',
          marginTop: '100px',
          fontSize: '18px',
          padding: '16px 20px',
          color: 'black',
          fontWeight: '700',
          border: '2px solid black',
          borderRadius: '8px',
        },
      });
      return;
    }



      setMovies(responce);
      console.log(movies)
      return responce;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(String(err));
      }
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
    </>
  );
};

export default App;
