import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="content-center">
      <div className="error-page">
        <h1>Oops!</h1>
        <p>Ha ocurrido un error.</p>
        <p>
          {error.statusText} {error.status}
        </p>
        <div>
          <img src="./error.jpg" alt="Error" />
        </div>
        <Link to={"/"}>Regresar al inicio</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
