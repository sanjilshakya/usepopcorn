import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

const KEY = "fad37b53";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, loading, error } = useMovies(keyword);
  const [watched, setWatched] = useLocalStorageState([], "watched");

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
