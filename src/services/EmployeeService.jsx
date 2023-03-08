import axiosObject from "../ConfigAxios";

export default class EmployeeService {
  static crudEmployee({ method, config }) {
    const { setMessage, callback, ...rest } = config;

    switch (method) {
      case "POST":
        axiosObject
          .post("employee/", rest.employee.getData())
          .then((res) => {
            callback();

            let successMessage = {
              message: "✓ Empleado registrado satisfactoriamente.",
              className: ["message", "message-success"],
            };

            setMessage(successMessage);
          })
          .catch((err) => {
            let errorMessage = {
              message: "✘ Error al registrar empleado, Vuelve a intentarlo.",
              className: ["message", "message-error"],
            };

            setMessage(errorMessage);

            console.log(err);
          });
        break;
      case "PUT":
        axiosObject
          .put(`employee/${rest.employee.id}/`, rest.employee.getData())
          .then((res) => {
            callback();

            let successMessage = {
              message: "✓ Empleado modificado satisfactoriamente.",
              className: ["message", "message-success"],
            };

            setMessage(successMessage);
          })
          .catch((err) => {
            let errorMessage = {
              message: "✘ Error al modificar empleado, Vuelve a intentarlo.",
              className: ["message", "message-error"],
            };

            setMessage(errorMessage);

            console.log(err);
          });
        break;
      case "DELETE":
        axiosObject
          .delete(`employee/${rest.id}/`)
          .then(() => {
            callback();

            let successMessage = {
              message: "✓ Empleado eliminado satisfactoriamente.",
              className: ["message", "message-success"],
            };

            setMessage(successMessage);
          })
          .catch((err) => {
            let errorMessage = {
              message: "✘ Error al eliminar empleado, Vuelve a intentarlo.",
              className: ["message", "message-error"],
            };

            setMessage(errorMessage);

            console.log(err);
          });
        break;
      default:
        break;
    }
  }
}
