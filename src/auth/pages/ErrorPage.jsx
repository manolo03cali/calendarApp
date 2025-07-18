import "./ErrorPage.css";

export const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Página no encontrada</h2>
        <p className="error-message">
          La página que estás buscando no existe o ha sido movida. Verifica la
          URL o regresa al inicio.
        </p>
        <a href="/" className="btn-return">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};
