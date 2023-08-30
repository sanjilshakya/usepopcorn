import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import TotalResult from "./components/TotalResult";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import ErrorHandler from "./components/ErrorHandler";
import MovieDetail from "./components/MovieDetail";
import WatchedMovieSummary from "./components/WatchedMovieSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import Loader from "./components/Loader";

const KEY = "fad37b53";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedMovieId((currId) => id);
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddMovieToList(newWatched) {
    setWatched((watched) => [...watched, newWatched]);
  }

  function handleRemoveMovie(movieId) {
    setWatched((watched) => watched.filter((x) => x.imdbID !== movieId));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${keyword}`
          );
          if (!res.ok) throw new Error("Oops !! Something went wrong.");
          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");
          setMovies((movies) => data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      if (keyword.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [keyword]
  );

  return (
    <>
      <NavBar>
        <Search keyword={keyword} setKeyword={setKeyword} />
        <TotalResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onMovieSelect={handleSelectMovie} />
          )}
          {error && <ErrorHandler message={error} />}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetail
              KEY={KEY}
              movieId={selectedMovieId}
              watched={watched}
              onClose={handleCloseMovie}
              onAddMovieToList={handleAddMovieToList}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onMovieRemove={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
