import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../features/userAPI";
import { clearUser } from "../features/user";


const Navbar = () => {
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(clearUser());
  };

  // authenticated links
  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DashboardPage">
          Dashboard
        </NavLink>
      </li>
      <span className="navbar-text mx-5">
        <strong>{user ? `Welcome ${user.username}` : ''}</strong>
      </span>
      <li className="nav-item">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button className="btn-warning btn text-light" onClick={handleLogout}>
            Logout
          </button>
        )}
      </li>
      
    </>
  );

  // guest links
  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/LoginPage">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/RegisterPage">
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary fixed-top text-center container-fluid">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand" to="#">
          AI Document Assistant
        </Link>
        <div className="collapse-sm navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
