import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Topbar from './components/Topbar';
import React from 'react';
import FirstComponent from './pages/page/FirstPage.jsx';
import SecondComponent from './pages/test/SecondPage.jsx';
// import Sidebar from './components/Sidebar.jsx';
import NoPage from './pages/no-page/NoPage.jsx';
import { backendAxiosClient } from './utility/apiClients.js';
import AdminProducts from './pages/admin/AdminProducts.jsx';

function App() {
  backendAxiosClient.get("/api/user").then(res => {
    console.log(res?.data)
  }).catch(res => {
    console.log(res?.data)
  })
  return (<Row className='col-12 m-0 p-0 vh-100 bg-light'>
      <BrowserRouter>
      {/* <Sidebar /> */}
      <Col className="col-12 m-0 p-0">
        <Topbar />
        <Row className='m-0 p-0 vh-95'>
          <Col className="col-12 m-0 p-0">
                <Routes>
                  <Route path="/" element={<Outlet/>}>
                    <Route path='' element={<FirstComponent />} />
                    <Route path='home' element={<FirstComponent />} />
                    <Route path='/admin/products' element={<AdminProducts />} />
                    <Route path='gagi' element={<SecondComponent />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
          </Col>
        </Row>
      </Col>
      </BrowserRouter>
    </Row>
  );
}

export default App;
