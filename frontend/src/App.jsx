import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css'

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import ChangePassword from './components/user/ChangePassword';

import NewProduct from './components/admin/NewProduct'



import { loadUser } from './actions/userActions';
import store from './store'; 
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import ProductsList from './components/admin/ProductsList';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/search/:keyword' Component={Home} />
            <Route path='/lgn' Component={Login} />
            <Route path='/register' Component={Register}/>
            <Route path='/product/:id' Component={ProductDetails} exact/>
            <Route path='/me' Component={Profile} exact/>
            <Route path='/password/update' Component={ChangePassword} />
            <Route path='/admin/product' Component={NewProduct} exact/>
            

    

            <Route path="/dashboard" Component={Dashboard} exact/>
            <Route path="/admin/users" Component={UsersList} exact/>
            <Route path="/admin/products" Component={ProductsList} exact/>
            <Route path="/admin/product/:id" Component={UpdateProduct} exact/>
            <Route path="/admin/user/:id" Component={UpdateUser} exact/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
