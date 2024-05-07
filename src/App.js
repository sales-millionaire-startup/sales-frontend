import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Topbar from './components/Topbar';
import React from 'react';
import FirstComponent from './pages/page/FirstPage.jsx';
import SecondComponent from './pages/test/SecondPage.jsx';
// import Sidebar from './components/Sidebar.jsx';
import NoPage from './pages/no-page/NoPage.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import { loaderAtom } from './states/jotai.js';
import { useAtomValue } from "jotai";
import WebsiteLoader from './components/WebiteLoader.jsx';
import AdminUnits from './pages/admin/AdminUnits.jsx';

function App() {
  const loader = useAtomValue(loaderAtom)
  return (<Row className='col-12 m-0 p-0 vh-100 bg-light'>
      <BrowserRouter>
      {/* <Sidebar /> */}
      {loader && <WebsiteLoader />}
      <Col className="col-12 m-0 p-0">
        <Topbar />
        <Row className='m-0 p-0 vh-95'>
          <Col className="col-12 m-0 p-0">
                <Routes>
                  <Route path="/" element={<Outlet/>}>
                    <Route path='' element={<FirstComponent />} />
                    <Route path='home' element={<FirstComponent />} />
                    <Route path='/admin/products' element={<AdminProducts />} />
                    <Route path='/admin/units' element={<AdminUnits />} />
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
