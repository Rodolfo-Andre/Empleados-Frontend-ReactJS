import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Employee from "../class/Employee";
import axiosObject from "../ConfigAxios";
import EmployeeService from "../services/EmployeeService";
import FormCrud from "./FormCrud";
import Loader from "./Loader";
import Message from "./Message";
import PaginationCrud from "./PaginationCrud";
import SearchCrud from "./SearchCrud";
import TableCrud from "./TableCrud";
import { redirectToIndex, handleSearchParams } from "../helpers";
import ErrorSearch from "./ErrorSearch";

const Crud = () => {
  const [searchParams, setSearchParams] = useSearchParams(),
    [data, setData] = useState([]),
    [loader, setLoader] = useState(false),
    [dataToEdit, setDataToEdit] = useState(null),
    [message, setMessage] = useState(null),
    [error, setError] = useState(null),
    [pagination, setPagination] = useState(null),
    { auth } = useContext(AuthContext),
    navigate = useNavigate();

  const fetchData = async () => {
    setLoader(true);

    const query = searchParams.get("page"),
      search = searchParams.get("search");

    try {
      const dataAxios = await axiosObject.get(
          `employee/${query ? "?page=" + query : ""}${
            search ? "&search=" + search : ""
          }`
        ),
        listEmployee = dataAxios.data.results.map((e) => new Employee(e)),
        configPagination = dataAxios.data.pagination;

      setData(listEmployee);
      setPagination(configPagination);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setError({
        title: "Ups!!! Ha ocurrido un error.",
        description: "La página que estás buscando no exite",
        image: "./error_404.jpg",
        alt: `Error ${err.status}`,
      });

      console.log(err);
    }
  };

  useEffect(() => {
    isNotAuthenticated();
  }, []);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  const isNotAuthenticated = () => {
    if (!auth) {
      redirectToIndex(navigate);
    }
  };

  const post = (employee) => {
    const options = {
      method: "POST",
      config: {
        employee,
        setMessage,
        callback: () => {
          fetchData();
        },
      },
    };

    EmployeeService.crudEmployee(options);
  };

  const put = (employee) => {
    const options = {
      method: "PUT",
      config: {
        employee,
        setMessage,
        callback: () => {
          fetchData();
        },
      },
    };

    EmployeeService.crudEmployee(options);
  };

  const del = ({ id, first_name, last_name }) => {
    const confirmDelete = window.confirm(
      `¿Estas seguro de eliminar a ${first_name} ${last_name}?`
    );

    if (confirmDelete) {
      const options = {
        method: "DELETE",
        config: {
          id,
          setMessage,
          callback: () => {
            const { current_page, count_per_page, num_pages } = pagination;

            if (
              count_per_page === 1 &&
              current_page === num_pages &&
              current_page > 1
            ) {
              handleSearchParams(
                searchParams,
                setSearchParams,
                current_page - 1
              );
              return;
            }

            fetchData();
          },
        },
      };

      EmployeeService.crudEmployee(options);
    }
  };

  const goPageOne = () => {
    handleSearchParams(searchParams, setSearchParams);
    setError(null);
  };

  const renderSearchTableCrud = () => {
    if (error) {
      return <ErrorSearch error={error} goPageOne={goPageOne} />;
    }

    return (
      <>
        <SearchCrud
          searchP={searchParams.get("search")}
          setSearchParams={setSearchParams}
        />

        <TableCrud data={data} setDataToEdit={setDataToEdit} del={del} />
      </>
    );
  };

  return (
    <div>
      <h2 className="text-center">Crud Empleados</h2>

      <div className="table-content">
        {loader ? <Loader /> : renderSearchTableCrud()}

        {data.length > 0 && pagination && (
          <PaginationCrud
            pagination={pagination}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        )}
      </div>

      {message && (
        <Message message={message.message} className={message.className} />
      )}

      <FormCrud
        post={post}
        put={put}
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}
      />
    </div>
  );
};

export default Crud;
