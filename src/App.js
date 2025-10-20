import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';

function App() {
  return (
    <Router>
      <header className='header'>
        <div className='container header-inner'>
          <div className='brand'>CineMix</div>
          <nav className='nav'>
            <NavLink
              to='/'
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              홈
            </NavLink>
          </nav>
        </div>
      </header>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie/:id' element={<Detail />} />
        </Routes>
        <div className='spacer' />
      </main>
    </Router>
  );
}

export default App;
