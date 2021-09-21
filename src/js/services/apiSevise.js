// Класс запросов на REST API
import {BASE_FETCH_URL, API_KEY} from '../const';

class ApiService {
  constructor() {
    this.query = '';
    this.openedFilm = null;
  }

  async fetchGetMediaTrending(page) {
    const response = await fetch(
      `${BASE_FETCH_URL}/trending/movie/week?page=${page}&api_key=${API_KEY}`,
    );
    const movies = await response.json();
    const updataFilms = movies.results.map(film => {
      return {
        ...film,
        poster_path: film.poster_path
          ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          : 'https://smfanton.ru/wp-content/uploads/2015/11/de1.jpg',
      };
    });
    const apdataMovies = {...movies, results: updataFilms};
    return apdataMovies;
  }

  async fetchGetGenres() {
    const response = await fetch(
      `${BASE_FETCH_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
    const genres = await response.json();
    this.genres = genres.genres;
    return genres;
  }

  async searchMovie(page) {
    const response = await fetch(
      `${BASE_FETCH_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${this.query}`,
    );
    const movies = await response.json();
    const updataFilms = movies.results.map(film => {
      return {
        ...film,
        poster_path: film.poster_path
          ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          : 'https://smfanton.ru/wp-content/uploads/2015/11/de1.jpg',
      };
    });
    const apdataMovies = {...movies, results: updataFilms};
    return apdataMovies;
  }

  set searchQuery(value) {
    this.query = value;
  }

  async fetchOpenModal(id) {
    const response = await fetch(
      `${BASE_FETCH_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
    );
    const movie = await response.json();
    // console.log(movie)
    this.openedFilm = movie;
    // return movie;
    movie.poster_path = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : 'https://smfanton.ru/wp-content/uploads/2015/11/de1.jpg';
    return movie;
  }
}

const newApiService = new ApiService();

export default newApiService;
