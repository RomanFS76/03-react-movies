import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoader(true);
      setIsError(false);
      const responce = await fetchMovies(query);

      if (responce.length === 0) {
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

      
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };
  useEffect(() => {
    console.log('Movies updated:', movies);
  }, [movies]);
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster />
    </>
  );
};

export default App;
