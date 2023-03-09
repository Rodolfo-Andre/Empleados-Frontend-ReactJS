import { useState } from "react";
import { Search, TrashFill } from "react-bootstrap-icons";

const initialSearch = "";

const SearchCrud = ({ searchP, setSearchParams }) => {
  const [search, setSearch] = useState(searchP ?? initialSearch);

  const handleOnClick = () => {
    if (search.trim() !== "" && search !== searchP) {
      setSearchParams({ page: 1, search });
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const resetSearch = () => {
    if (searchP !== initialSearch && searchP !== null) {
      setSearch(initialSearch);
      setSearchParams({ page: 1 });
    }
  };

  return (
    <div className="search-content">
      <input
        onChange={handleOnChange}
        placeholder="Buscar..."
        type="search"
        name="search"
        id="search"
        value={search}
      />

      <button className="btn" onClick={handleOnClick}>
        <Search className="icon" />
        Buscar
      </button>

      <button className="btn" onClick={resetSearch}>
        <TrashFill className="icon" />
        Limpiar
      </button>
    </div>
  );
};

export default SearchCrud;
