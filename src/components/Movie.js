import { Link } from 'react-router-dom';

function Movie({ id, coverImage, title, genres = [], rating, year }) {
  return (
    <article className='card' role='listitem'>
      <Link to={`/movie/${id}`} aria-label={`${title} 상세보기`}>
        <img
          className='card-media'
          src={coverImage}
          alt={title}
          loading='lazy'
        />
        <div className='card-overlay'>
          <div className='overlay-actions'>
            <button className='btn' type='button'>
              상세보기
            </button>
            <button className='btn secondary' type='button' aria-label='찜'>
              찜
            </button>
          </div>
        </div>
        <div className='card-body'>
          <div className='card-title'>{title}</div>
          <div className='card-meta'>
            {year} · ⭐ {rating}
          </div>
          <div className='chips'>
            {genres.slice(0, 3).map((g) => (
              <span className='chip' key={g}>
                {g}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
export default Movie;
