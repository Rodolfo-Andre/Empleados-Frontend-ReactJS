import { createContext, useState } from "react";
import { Outlet, useHref, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

const AuthContext = createContext();

function App() {
  const href = useHref(),
    isAuth = useLoaderData(),
    [auth, setAuth] = useState(isAuth);

  return (
    <AuthContext.Provider value={Object({ auth, setAuth })}>
      {href !== "/login" && <Header />}
      <main>{href === "/" ? <Welcome /> : <Outlet />}</main>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
