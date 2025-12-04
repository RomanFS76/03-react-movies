import { createPortal } from 'react-dom';
import css from './MovieModal.module.css';
import type { Movie } from '../../types/movie';

interface MovieModalProps {
  movie:Movie,
  onClose: () => void;
}

const MovieModal = ({ movie,onClose }: MovieModalProps) => {
  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={movie.backdrop_path?`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`:'/noPoster.png'}
          alt="movie_title"
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;
