import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Topbar from './components/Topbar';
import React, { useEffect } from 'react';
import FirstComponent from './pages/page/FirstPage.jsx';
import SecondComponent from './pages/test/SecondPage.jsx';
// import Sidebar from './components/Sidebar.jsx';
import NoPage from './pages/no-page/NoPage.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import { loaderAtom, userAtom } from './states/jotai.js';
import { useAtomValue, useSetAtom } from "jotai";
import WebsiteLoader from './components/WebiteLoader.jsx';
import AdminUnits from './pages/admin/AdminUnits.jsx';
import ClientProducts from './pages/client/ClientProducts.jsx';
import RegisterPage from './pages/register/Register.jsx';
import LoginPage from './pages/login/Login.jsx';
import { useCookies } from 'react-cookie';
import { backendAxiosClient, backendFileClient } from './utility/apiClients.js';
import Cart from './pages/client/Cart.jsx';

function App() {
  const loader = useAtomValue(loaderAtom)
  const [cookies] = useCookies();
  const setUser = useSetAtom(userAtom)
  useEffect(() => {
    const token = cookies['token']
    if (token) {
      backendAxiosClient.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        error => Promise.reject(error)
      )
      backendFileClient.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`
          return config
        },
        error => Promise.reject(error)
      )
      backendAxiosClient.get("api/user").then(res => {
          if (res.data) {
            setUser(res.data)
          }
        }
      )
    }
  }, [cookies, setUser])
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
                    <Route path='/client/products' element={<ClientProducts />} />
                    <Route path='/products' element={<ClientProducts />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/admin/units' element={<AdminUnits />} />
                    <Route path='register' element={<RegisterPage />} />
                    <Route path='login' element={<LoginPage />} />
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
