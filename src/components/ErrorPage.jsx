import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Ha ocurrido un error.</p>
      <p>{error.statusText || error.status}</p>
      <Link to={"/"}>Regresar al inicio</Link>
    </div>
  );
};

export default ErrorPage;
