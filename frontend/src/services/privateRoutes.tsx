
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/authUtils';



const PrivateRoute = () => {
  const authenticated = isAuthenticated();

  if (!authenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return <Outlet />;
};

export default PrivateRoute;
