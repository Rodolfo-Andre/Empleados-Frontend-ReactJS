import RowCrud from "./TableRowCrud";

const TableCrud = ({ data, setDataToEdit, del }) => {
  return (
    <table className="m-auto">
      <thead>
        <tr>
          <th scope="col">Nombres</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Fecha de Nacimiento</th>
          <th scope="col">Salario</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>

      <tbody className="text-center">
        {data.length ? (
          data.map((employee) => (
            <RowCrud
              key={employee.id}
              employee={employee}
              setDataToEdit={setDataToEdit}
              del={del}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5}>No hay datos</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableCrud;
