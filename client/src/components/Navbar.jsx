import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

import LogoutButton from './LogoutButton';

function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='navbar-brand'>
          Health ChatBot
        </Link>

        <div className='navbar-links'>
          <Link to='/' className='navbar-link'>
            Home
          </Link>

          {!token && (
            <>
              <Link to='/login' className='navbar-link'>
                Login
              </Link>

              <Link to='/register' className='navbar-link'>
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              <Link to='/dashboard' className='navbar-link'>
                Dashboard
              </Link>

              <Link to='/assessment' className='navbar-link'>
                Assessment
              </Link>

              <Link to='/history' className='navbar-link'>
                History
              </Link>

              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
