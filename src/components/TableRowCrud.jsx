import { PencilSquare, TrashFill } from "react-bootstrap-icons";

const TableRowCrud = ({ employee, setDataToEdit, del }) => {
  let { first_name, last_name, date_of_birth, salary } = employee.getData();
  let id = employee.id;

  return (
    <tr>
      <td data-label="Nombres">{first_name}</td>
      <td data-label="Apellidos">{last_name}</td>
      <td data-label="Fecha de Nacimiento ">{date_of_birth}</td>
      <td data-label="Salario">S/.{salary}</td>
      <td data-label="Acciones">
        <div>
          <button
            className="btn btn-yellow"
            onClick={() => setDataToEdit(employee)}
          >
            <PencilSquare className="icon" />
            Editar
          </button>
        </div>

        <div>
          <button
            className="btn btn-red"
            onClick={() => del({ id, first_name, last_name })}
          >
            <TrashFill className="icon" />
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRowCrud;
