import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const getMovie = async () => {
      const res = await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`,
        { signal: controller.signal },
      );
      const json = await res.json();
      setMovie(json.data.movie);
      setLoading(false);
    };
    getMovie();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className='detail'>
        <div className='poster skeleton' style={{ aspectRatio: '2/3' }} />
        <div className='section'>
          <div
            className='skeleton skeleton-text'
            style={{ width: '60%', height: 18, marginBottom: 12 }}
          />
          <div
            className='skeleton skeleton-text'
            style={{ width: '90%', height: 12, marginBottom: 8 }}
          />
          <div
            className='skeleton skeleton-text'
            style={{ width: '85%', height: 12, marginBottom: 8 }}
          />
          <div
            className='skeleton skeleton-text'
            style={{ width: '70%', height: 12 }}
          />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className='detail'>
      <div className='poster'>
        <img
          src={movie.large_cover_image || movie.medium_cover_image}
          alt={movie.title}
        />
      </div>
      <div>
        <div className='headline'>
          <h1>{movie.title}</h1>
          {movie.mpa_rating ? (
            <span className='badge'>{movie.mpa_rating}</span>
          ) : null}
        </div>
        <div className='meta'>
          <span>{movie.year}</span>
          <span>⭐ {movie.rating}</span>
          {movie.runtime ? <span>{movie.runtime}분</span> : null}
        </div>

        <div className='section' style={{ marginTop: 12 }}>
          <div className='chips' style={{ marginBottom: 10 }}>
            {(movie.genres || []).map((g) => (
              <span className='chip' key={g}>
                {g}
              </span>
            ))}
          </div>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.7 }}>
            {movie.description_full || movie.summary}
          </p>
        </div>

        {movie.torrents && movie.torrents.length > 0 ? (
          <div className='section' style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>다운로드</div>
            <div className='chips'>
              {movie.torrents.map((t, idx) => (
                <a
                  key={idx}
                  className='chip'
                  href={t.url}
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {t.quality} · {t.type} · {t.size}
                </a>
              ))}
            </div>
          </div>
        ) : null}

        {movie.yt_trailer_code ? (
          <div className='section' style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>트레일러</div>
            <div
              style={{
                position: 'relative',
                paddingTop: '56.25%',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <iframe
                title='YouTube trailer'
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  border: '0',
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Detail;
