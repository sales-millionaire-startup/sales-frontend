import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Topbar from './components/Topbar';
import React from 'react';
import FirstComponent from './pages/page/FirstPage.jsx';
import SecondComponent from './pages/test/SecondPage.jsx';
import Sidebar from './components/Sidebar.jsx';
import NoPage from './pages/no-page/NoPage.jsx';

function App() {
  return (<Row className='col-12 m-0 p-0 vh-100 bg-info'>
      <BrowserRouter>
      <Sidebar />
      <Col className="col-11 m-0 p-0">
        <Topbar />
        <Row className='m-0 p-0'>
          <Col className="col-12 m-0 p-0">
                <Routes>
                  <Route path="/" element={<Outlet/>}>
                    <Route path='' element={<FirstComponent />} />
                    <Route path='home' element={<FirstComponent />} />
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
