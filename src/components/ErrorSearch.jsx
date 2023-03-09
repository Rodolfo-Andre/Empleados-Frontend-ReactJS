const ErrorSearch = ({ error, goPageOne }) => {
  return (
    <div className="text-center content-error-image">
      <img src={error.image} alt={error.alt} />

      <div>
        <h2>{error.title}</h2>
        <p>{error.description}</p>
      </div>

      {error.alt.includes("404") && (
        <p onClick={goPageOne} className="go-page-one">
          Volver a la primera página
        </p>
      )}
    </div>
  );
};

export default ErrorSearch;
