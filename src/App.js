import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './component/sidebar/Sidebar';
import Header from './component/header/Header';
import Overview from './pages/teacher/Overview';
import AddLesssion from './pages/teacher/AddLesssion';
import Lessions from './pages/teacher/Lessions';
import { useDispatch, useSelector } from "react-redux";
import DetailClass from './pages/teacher/DetailClass';

function App() {
  const isOpen = useSelector(state => state.menu.isOpenMenu);

  return (
    <div className='container'>
      <BrowserRouter>
        <Sidebar />
        <div style={{ width: isOpen ? "85%" : "95%" }} className="content_container">
          <Header />
          <Routes>
            <Route path="/" element={<Overview />} />
          </Routes>
          <Routes>
            <Route path="/bai-hoc" element={<Lessions />} />
          </Routes>
          <Routes>
            <Route path="/tao-bai-giang" element={<AddLesssion />} />
          </Routes>
          <Routes>
            <Route path="/bai-hoc/chi-tiet-lop-hoc" element={<DetailClass />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
