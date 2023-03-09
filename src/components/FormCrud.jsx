import { useFormik } from "formik";
import { useEffect } from "react";
import Employee from "../class/Employee";
import CrudSchema from "../schema/CrudSchema";
import {
  PersonFillAdd,
  Trash2Fill,
  ExclamationCircleFill,
} from "react-bootstrap-icons";

const initialValues = {
  first_name: "",
  last_name: "",
  salary: 0.0,
  date_of_birth: "",
};

const FormCrud = ({ post, put, dataToEdit, setDataToEdit }) => {
  const formik = useFormik({
      initialValues: initialValues,
      validationSchema: CrudSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values) => {
        const employee = new Employee(values);

        if (dataToEdit) {
          employee.id = dataToEdit.id;

          put(employee);

          setDataToEdit(null);
        } else {
          post(employee);
        }

        formik.resetForm();
      },
    }),
    setValuesToFormik = formik.setValues;

  useEffect(() => {
    if (dataToEdit) {
      setValuesToFormik(dataToEdit.getData());
    }
  }, [dataToEdit, setValuesToFormik]);

  const resetFields = () => {
    if (dataToEdit) {
      setDataToEdit(null);
    }

    formik.resetForm();
  };

  return (
    <div className="mb-1">
      <h2 className="text-center">
        {dataToEdit ? "Modificando Empleado" : "Registro de Empleados"}
      </h2>

      <form
        className="m-auto form form-employee"
        onSubmit={formik.handleSubmit}
      >
        <div className="component-input">
          <label htmlFor="first-name">Nombres:</label>
          <div>
            <input
              id="first-name"
              type="text"
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />

            {formik.errors.first_name && (
              <div className="field-error">
                <ExclamationCircleFill className="icon" />
                <span>{formik.errors.first_name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="component-input">
          <label htmlFor="last-name">Apellidos:</label>
          <div>
            <input
              type="text"
              name="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />

            {formik.errors.last_name && (
              <div className="field-error">
                <ExclamationCircleFill className="icon" />
                <span>{formik.errors.last_name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="component-input">
          <label htmlFor="salary">Salario:</label>
          <div>
            <input
              type="number"
              name="salary"
              onChange={formik.handleChange}
              value={formik.values.salary}
            />

            {formik.errors.salary && (
              <div className="field-error">
                <ExclamationCircleFill className="icon" />
                <span>{formik.errors.salary}</span>
              </div>
            )}
          </div>
        </div>

        <div className="component-input">
          <label htmlFor="date_of_birth">Fecha de Nacimiento:</label>
          <div>
            <input
              type="date"
              name="date_of_birth"
              onChange={formik.handleChange}
              value={formik.values.date_of_birth}
            />

            {formik.errors.date_of_birth && (
              <div className="field-error">
                <ExclamationCircleFill className="icon" />
                <span>{formik.errors.date_of_birth}</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-btn-content">
          <button className="btn btn-black font-bold" type="submit">
            <PersonFillAdd className="icon" />
            {dataToEdit ? "Modificar" : "Registrar"}
          </button>

          <button
            className="btn btn-black font-bold"
            type="button"
            onClick={resetFields}
          >
            <Trash2Fill className="icon" />
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormCrud;
