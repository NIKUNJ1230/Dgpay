import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Componets/Login/Login";
import Layout from "./Componets/Layout/Layout";
import Money_transfer1 from "./Componets/Services/Money_transfer1";

const Run = () => {
  return (
   

      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/Money_transfer1" element={<Money_transfer1 />} />
      </Routes>
      

  );
};

export default Run;
