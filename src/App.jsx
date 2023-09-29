
import './App.css'
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmpCreate from "./EmpCreate";
import EmpDetail from "./EmpDetail";
import EmpEdit from "./EmpEdit";
import EmpListing from "./EmpListing";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      <h1>React JS CRUD Assesment</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <EmpListing /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          ></Route>
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />}></Route>
          <Route path="/employee/create" element={<EmpCreate />}></Route>
          <Route path="/employee/detail/:empid" element={<EmpDetail  />}></Route>
          <Route path="/employee/edit/:empid" element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
