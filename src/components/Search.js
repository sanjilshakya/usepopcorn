import { useEffect, useRef } from "react";

export default function Search({ keyword, setKeyword }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      ref={inputEl}
    />
  );
}
