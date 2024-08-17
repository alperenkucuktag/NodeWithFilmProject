import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
