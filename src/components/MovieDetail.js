import { useEffect, useRef, useState } from "react";
import StarRating from "../StarRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

export default function MovieDetail({
  movieId,
  watched,
  onClose,
  onAddMovieToList,
  KEY,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched =
    watched.findIndex((x) => x.imdbID === movie.imdbID) >= 0 ? true : false;
  const watchedUserRating = watched.find(
    (x) => x.imdbID === movieId
  )?.userRating;
  const {
    Title,
    // Year,
    Genre,
    // Ratings,
    Released,
    Runtime,
    imdbRating,
    Plot,
    Actors,
    Director,
    Poster,
  } = movie;

  const ratingDescisionCount = useRef(0);

  useEffect(() => {
    if (userRating) ratingDescisionCount.current++;
  }, [userRating]);

  useEffect(
    function () {
      async function fetchMovieDetail() {
        setLoading((curVal) => true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`
        );
        const data = await res.json();
        setLoading((curVal) => false);
        setMovie(data);
      }
      fetchMovieDetail();
    },
    [movieId, KEY]
  );

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie: ${Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [Title]
  );

  useKey("Escape", onClose);

  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") onClose();
  //     }
  //     document.addEventListener("keydown", callback);

  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onClose]
  // );

  function onAddMovie() {
    const Runtime = movie.Runtime.split(" ").at(0);
    const newWatchedMovie = {
      ...movie,
      userRating,
      Runtime,
      ratingDescisionCount: ratingDescisionCount.current,
    };
    onAddMovieToList(newWatchedMovie);
    onClose();
  }

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating numOfStars={10} onMovieRate={setUserRating} />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={onAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
