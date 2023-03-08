import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../App";
import AuthService from "../services/AuthService";

const Header = () => {
  const { auth } = useContext(AuthContext);

  const handleOnClick = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <header className="header">
      <div>
        <NavLink to="/" className={"link-content"}>
          {({ isActive }) => (
            <div>
              Inicio
              <div className={isActive ? "line-active" : "line-animated"}></div>
            </div>
          )}
        </NavLink>

        {auth && (
          <NavLink to="crud" className="link-content">
            {({ isActive }) => (
              <div>
                CRUD
                <div
                  className={isActive ? "line-active" : "line-animated"}
                ></div>
              </div>
            )}
          </NavLink>
        )}
      </div>

      <div>
        {auth ? (
          <Link
            to="/"
            onClick={handleOnClick}
            className="link-content d-contents "
          >
            <div>
              Cerrar Sesión
              <div className="line-animated"></div>
            </div>
          </Link>
        ) : (
          <Link to="login" className="link-content d-contents ">
            <div>
              Iniciar Sesión
              <div className="line-animated"></div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
