import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { fetchMoviesByName } from '../../api/tmdb-api';

import Loader from '../../components/Loader';

import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  const handleSubmit = e => {
    e.preventDefault();

    const query = e.target.query.value.trim();
    if (!query || searchQuery === query) return;

    setSearchParams({ query });
  };

  //! Controlled input element (just for training)
  // const handleInputChange = newQuery => {
  //   const params = newQuery !== '' ? { query: newQuery.toLowerCase().trim() } : {};
  //   setSearchParams(params);
  // };

  useEffect(() => {
    if (searchQuery.length === 0) return;

    const controller = new AbortController();
    setStatus('pending');

    async function getMovie() {
      try {
        const data = await fetchMoviesByName(searchQuery, controller);

        setMovies(data.results);
        setStatus(data.results.length > 0 ? 'success' : 'rejected');
      } catch (error) {
        throw new Error(error.message);
      }
    }
    getMovie();

    return () => controller.abort();
  }, [searchQuery]);
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input type="search" name="query" />
        <button type="submit">Search</button>
      </form>
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>No movies were found :(</p>}
      {status === 'success' && (
        <ul className={styles.moviesList}>
          {movies.map(({ id, original_title }) => (
            <li key={id}>
              <Link to={`${id}`} state={location}>
                {original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default MoviesPage;
