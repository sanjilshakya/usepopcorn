export default function Search({ keyword, setKeyword }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
}
