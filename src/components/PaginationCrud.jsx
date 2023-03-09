import ReactPaginate from "react-paginate";
import { handleSearchParams } from "../helpers";

const PaginationCrud = ({ pagination, searchParams, setSearchParams }) => {
  const { current_page, num_pages, count } = pagination;

  const handlePageClick = ({ selected }) => {
    handleSearchParams(searchParams, setSearchParams, selected + 1);
  };

  return (
    <div className="pagination">
      <div>
        Navegando de {current_page} al {num_pages}
      </div>

      <ReactPaginate
        nextLabel="Siguiente"
        forcePage={current_page - 1}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        pageCount={num_pages}
        previousLabel="Anterior"
        breakLabel=""
        activeClassName="active"
        className="navigation"
        renderOnZeroPageCount={null}
      />

      <div>Se encontraron {count} resultados</div>
    </div>
  );
};

export default PaginationCrud;
