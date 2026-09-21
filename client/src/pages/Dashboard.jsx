import { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.name}!</p>

      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Dashboard;
