import { useEffect, useState } from "react";

const KEY = "fad37b53";

export function useMovies(keyword) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${keyword}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Oops !! Something went wrong.");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies((movies) => data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
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

      return function () {
        controller.abort();
      };
    },
    [keyword]
  );

  return { movies, loading, error };
}
