import { createContext, useState } from "react";
import { Outlet, useHref, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

const AuthContext = createContext();

function App() {
  const href = useHref();
  const isAuth = useLoaderData();
  const [auth, setAuth] = useState(isAuth);
  const data = { auth, setAuth };

  return (
    <AuthContext.Provider value={data}>
      {href !== "/login" && <Header />}
      <main>{href === "/" ? <Welcome /> : <Outlet />}</main>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext };
