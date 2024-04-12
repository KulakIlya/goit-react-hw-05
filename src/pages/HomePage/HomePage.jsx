import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Loader from '../../components/Loader';

import { fetchTrendingMovies } from '../../api/tmdb-api';

import styles from './HomePage.module.css';

const HomePage = () => {
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');
    const controller = new AbortController();

    async function getTrendingMovies() {
      try {
        const data = await fetchTrendingMovies(controller);

        setMovies(data.results);
        setStatus(data.results.length > 0 ? 'success' : 'rejected');
      } catch (error) {
        throw new Error(error.message);
      }
    }

    getTrendingMovies();

    // Cancel request if component unmounts
    return () => controller.abort();
  }, []);

  return (
    <>
      <h1 className={styles.heading}>Trending today</h1>

      {status === 'pending' && <Loader />}
      {status === 'rejected' && <p>Error: No movies was found :(</p>}
      {status === 'success' && (
        <ul className={styles.moviesList}>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`movies/${id}`} state={{ from: location.pathname }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default HomePage;
