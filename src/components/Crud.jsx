import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

function Crud() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoader(true);

    let query = searchParams.get("page");
    let search = searchParams.get("search");

    try {
      let dataAxios = await axiosObject.get(
        `employee/${query ? "?page=" + query : ""}${
          search ? "&search=" + search : ""
        }`
      );

      const listEmployee = dataAxios.data.results.map((e) => new Employee(e));
      const configPagination = dataAxios.data.pagination;

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
  }, [searchParams]);

  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
    let confirmDelete = window.confirm(
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
            let search = searchParams.get("search");

            if (
              count_per_page === 1 &&
              current_page === num_pages &&
              current_page > 1
            ) {
              if (search) {
                setSearchParams({ page: current_page - 1, search });
              } else {
                setSearchParams({ page: current_page - 1 });
              }
            } else {
              fetchData();
            }
          },
        },
      };

      EmployeeService.crudEmployee(options);
    }
  };

  const goPageOne = () => {
    let search = searchParams.get("search");

    if (search) {
      setSearchParams({ page: 1, search });
    } else {
      setSearchParams({ page: 1 });
    }

    setError(null);
  };

  return (
    <div>
      <h2 className="text-center">Crud Empleados</h2>

      <div className="table-content">
        {loader ? (
          <Loader />
        ) : error ? (
          <div className="text-center content-error-image">
            <img src={error.image} alt={error.alt} />

            <div>
              <h2>{error.title}</h2>
              <p>{error.description}</p>
            </div>

            {error.alt.includes("404") && (
              <p onClick={goPageOne} className="go-page-one">
                Volver a la primera página
              </p>
            )}
          </div>
        ) : (
          <>
            <SearchCrud
              searchP={searchParams.get("search")}
              setSearchParams={setSearchParams}
            />

            <TableCrud data={data} setDataToEdit={setDataToEdit} del={del} />
          </>
        )}

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
}

export default Crud;
