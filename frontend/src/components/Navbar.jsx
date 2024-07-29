import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";

const Navbar = () => {
  const dispatch = useDispatch();

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/DashboardPage">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <button
            className=" btn-warning btn text-light"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        )}
      </li>
    </>
  );
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
    <nav className="navbar navbar-expand-sm bg-body-tertiary fixed-top text-center">
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
          AI Assistant
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
