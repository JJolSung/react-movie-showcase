import { useState, useEffect, useMemo } from 'react';
import Movie from '../components/Movie';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    (async () => {
      try {
        const params = new URLSearchParams({
          minimum_rating: '8.0',
          limit: '48',
          sort_by: sortBy,
          order_by: sortBy === 'title' ? 'asc' : 'desc',
          with_rt_ratings: 'true',
        });
        const res = await fetch(
          `https://yts.mx/api/v2/list_movies.json?${params.toString()}`,
          { signal: controller.signal },
        );
        const json = await res.json();
        setMovies(json.data.movies || []);
      } catch (e) {
        // ignore abort errors
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [sortBy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (movies || []).filter((m) => {
      const passQuery = !q || m.title.toLowerCase().includes(q);
      const passGenre = !genre || (m.genres || []).includes(genre);
      return passQuery && passGenre;
    });
  }, [movies, query, genre]);

  const genres = useMemo(() => {
    const set = new Set();
    (movies || []).forEach((m) => (m.genres || []).forEach((g) => set.add(g)));
    return Array.from(set).sort();
  }, [movies]);

  return (
    <div style={{ paddingTop: 12 }}>
      <div className='controls'>
        <input
          className='input'
          placeholder='제목 검색...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label='영화 제목 검색'
        />
        <select
          className='select'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label='정렬 기준'
        >
          <option value='year'>연도 최신순</option>
          <option value='rating'>평점 높은순</option>
          <option value='download_count'>다운로드 많은순</option>
          <option value='like_count'>좋아요 많은순</option>
          <option value='title'>제목 A→Z</option>
        </select>
        <select
          className='select'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          aria-label='장르 필터'
        >
          <option value=''>모든 장르</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className='grid'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div className='card' key={i}>
              <div className='card-media skeleton' />
              <div className='card-body'>
                <div
                  className='skeleton skeleton-text'
                  style={{ width: '80%' }}
                />
                <div
                  className='skeleton skeleton-text'
                  style={{ width: '50%' }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='grid' role='list'>
          {filtered.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImage={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres || []}
              rating={movie.rating}
              year={movie.year}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
