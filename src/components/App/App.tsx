import { useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import './App.module.css';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoader(true);
      setIsError(false);
      const response = await fetchMovies(query);

      if (response.length === 0) {
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

      setMovies(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoader && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
      <Toaster />
    </>
  );
};

export default App;
