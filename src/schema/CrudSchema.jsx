import * as Yup from "yup";

const CrudSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "El nombre debe tener como mínimo 3 caracteres")
    .max(50, "El nombre no debe de exceder los 50 caracteres")
    .required("El nombre es obligatorio"),
  last_name: Yup.string()
    .min(3, "El apellido debe tener como mínimo 3 caracteres")
    .max(50, "El apelldio no debe de exceder los 50 caracteres")
    .required("El apellido es obligatorio"),
  salary: Yup.number()
    .required("El salario es obligatorio")
    .max(99999.99, "No debe de contener más de 7 dígitos")
    .positive("El salario debe ser positivo")
    .test("decimal-is-correct", "Solo 2 decimales", (value) =>
      (value + "").match(/^\d*\.?\d{0,2}$/)
    ),
  date_of_birth: Yup.date()
    .max("12-12-2004", "La fecha máxima permitida es del 12-12-2004")
    .min("01-01-1950", "La fecha mínima permitida es del 01-01-1950")
    .required("La fecha de nacimiento es obligatorio"),
});

export default CrudSchema;
