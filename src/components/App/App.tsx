import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearch = async (query: string) => {
    try {
      const responce = await fetchMovies(query);
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
    </>
  );
};

export default App;
