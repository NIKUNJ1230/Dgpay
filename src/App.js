import "./App.css";
import Layout from "./Componets/Layout/Layout";
import Login from "./Componets/Login/Login";

import { useEffect, useState } from "react";
import Run from "./run";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    // const userToken = localStorage.getItem("token");
    setIsLoggedIn(false);
  }, []);

  return (
    <>
      {/* <Login/>  */}

      {/* {!isLoggedIn ? <Login /> : <Layout />} */}
      <Layout/>
    </>
  );
}

export default App;

