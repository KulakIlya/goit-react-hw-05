import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNjcxOTFmNmFmODY1NzNlM2NmOTU2ZjRkMzcxM2JlYiIsInN1YiI6IjY2MTdiOGM5YzA3MmEyMDE2MzkzM2VmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iT2KCBCY4_vnyFova-cRi-Ht0qtW3GaN8mKrYT_ymgs';

export const fetchTrendingMovies = ({ signal }) =>
  axios.get('/trending/movie/week', { signal }).then(res => res.data);

export const fetchMoviesByName = (query, { signal }) =>
  axios.get(`search/movie?query=${query}`, { signal }).then(res => res.data);

export const fetchMovie = (id, { signal }) => {
  return axios.get(`/movie/${id}`, { signal }).then(res => res.data);
};

export const fetchReviews = (id, { signal }) =>
  axios.get(`/movie/${id}/reviews`, { signal }).then(res => res.data);

export const fetchMovieCast = (id, { signal }) =>
  axios.get(`/movie/${id}/credits`, { signal }).then(res => res.data);
