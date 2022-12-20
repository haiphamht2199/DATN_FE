import logo from './logo.svg';
import './App.css';
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './component/sidebar/Sidebar';
import Header from './component/header/Header';
import Overview from './pages/teacher/Overview';
import AddLesssion from './pages/teacher/AddLesssion';
import Lessions from './pages/teacher/Lessions';
import { useDispatch, useSelector } from "react-redux";
import DetailClass from './pages/teacher/DetailClass';
import Login from './pages/autho/Login';
import Signup from './pages/autho/Signup';
import ProgramDetail from './pages/teacher/ProgramDetail';
import Home from './pages/student/Home';
import DetailProgramCaregory from './pages/teacher/DetailProgramCaregory';


function App() {
  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.menu.isOpenMenu);
  let token = useSelector(state => state.user.token);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({
        type: 'AUTO_LOGIN',
        payload: localStorage.getItem('token'),
        student: localStorage.getItem('student') ? localStorage.getItem('student') : ""
      });
    }

  }, [token]);


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Signup />} />
        </Routes>
        {
          token &&
          <div className='container'>
            <Sidebar />
            <div style={{ width: isOpen ? "85%" : "95%" }} className="content_container">

              <Header />
              <Routes>
                <Route path="student/home" element={<Home />} />
              </Routes>
              <Routes>
                <Route path="/home" element={<Overview />} />
              </Routes>
              <Routes>
                <Route path="/bai-hoc" element={<Lessions />} />
              </Routes>
              <Routes>
                <Route path="/tao-bai-giang" element={<AddLesssion />} />
              </Routes>
              {/* <Route
                path="/tao-bai-giang/tao-chuong-trinh-day"
                render={(props) => <ProgramLession {...props} />}
              /> */}
              <Routes>
                <Route path="/bai-hoc/chi-tiet-lop-hoc" element={<DetailClass />} />
              </Routes>
              <Routes>
                <Route path="/bai-hoc/chi-tiet-lop-hoc/chuong-trinh-hoc" element={<ProgramDetail />} />
              </Routes>
              <Routes>
                <Route path="/bai-hoc/chi-tiet-lop-hoc/chi-tiet-chuong-trinh-hoc" element={<DetailProgramCaregory />} />
              </Routes>
            </div>
          </div>
        }
      </BrowserRouter>
    </>
  );

}

export default App;
