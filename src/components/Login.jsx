import { Formik, Form, Field, yupToFormErrors } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import LoginSchema from "../schema/LoginSchema";
import AuthService from "../services/AuthService";
import Message from "./Message";

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  const verify = async (values, setSubmitting) => {
    try {
      await AuthService.login(values);
    } catch (error) {
      let errorMessage = {
        message: "✘ Nombre de usuario y/o contraseña incorrectas.",
        className: ["message", "message-error", "message-error-login"],
      };

      setMessage(errorMessage);
      setSubmitting(false);

      console.log(error);
    }
  };

  return (
    <div className="content-centered bg-black">
      <div className="content-sign-in">
        <h1 className="text-center">Inicio de Sesión</h1>

        {message && (
          <Message message={message.message} className={message.className} />
        )}

        <div className="m-auto">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
              verify(values, setSubmitting);
            }}
            validate={(values) => {
              try {
                LoginSchema.validateSync(values, { abortEarly: false });
              } catch (error) {
                if (message) setMessage(null);
                return yupToFormErrors(error);
              }
            }}
          >
            {({ errors, isSubmitting }) => (
              <Form className="form form-sign-in">
                <div>
                  <label htmlFor="username">Nombre de Usuario:</label>
                  <div className="control-input">
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Nombre de Usuario"
                    />

                    {errors.username && (
                      <div className="field-error">
                        <i className="icon bi bi-exclamation-circle-fill"></i>
                        <span>{errors.username}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password">Contraseña:</label>
                  <div className="control-input">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                    />

                    {errors.password && (
                      <div className="field-error">
                        <i className="icon bi bi-exclamation-circle-fill"></i>
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="btn btn-black font-bold"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Ingresar
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-end">
            <Link to="/">Regresar al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
