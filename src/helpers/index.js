const redirectToIndex = (navigate) => {
  navigate("/");
};

const handleSearchParams = (searchParams, setSearchParams, page = 1) => {
  const search = searchParams.get("search"),
    params = { page };

  if (search) {
    params.search = search;
  }

  setSearchParams(params);
};

export { redirectToIndex, handleSearchParams };
