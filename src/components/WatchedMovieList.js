import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onMovieRemove }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onMovieRemove={onMovieRemove}
        />
      ))}
    </ul>
  );
}
