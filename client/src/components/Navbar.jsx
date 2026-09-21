import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

import LogoutButton from './LogoutButton';

function Navbar() {
  const { token } = useContext(AuthContext);

  return (
    <nav>
      <Link to='/'>Home</Link>
      {' | '}

      {!token && (
        <>
          <Link to='/login'>Login</Link>
          {' | '}
          <Link to='/register'>Register</Link>
        </>
      )}

      {token && (
        <>
          <Link to='/dashboard'>Dashboard</Link>
          {' | '}
          <Link to='/assessment'>Assessment</Link>
          {' | '}
          <Link to='/history'>History</Link>
          {' | '}

          <LogoutButton />
        </>
      )}
    </nav>
  );
}

export default Navbar;
