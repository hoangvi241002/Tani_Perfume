import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Menu from './MenuComponent';
import Inform from './InformComponent';
import Home from './HomeComponent';
import Product from './ProductComponent';
import ProductDetail from './ProductDetailComponent';
import Signup from './SignupComponent';
import Active from './ActiveComponent';
import Login from './LoginComponent';
import Myprofile from './MyprofileComponent';
import Mycart from './MycartComponent';
import Myorders from './MyordersComponent';
import Footer from './FooterComponent';
import Logo from '../images/logo2.jpg'
import { Link } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className="body-customer">

                <div className='menu-container'>
                    <Link to="/home"> <img src={Logo} className='logo' alt="" /> </Link>
                    <div className='menu-all'>
                        <Menu />
                        <Inform />

                    </div>
                </div>
                <Routes>
                    <Route path='/' element={<Navigate replace to='/home' />} />
                    <Route path='/product/category/:cid' element={<Product />} />
                    <Route path='/product/brand/:bid' element={<Product />} />
                    <Route path='/product/search/:keyword' element={<Product />} />
                    <Route path='/product/:id' element={<ProductDetail />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/active' element={<Active />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/myprofile' element={<Myprofile />} />
                    <Route path='/mycart' element={<Mycart />} />
                    <Route path='/myorders' element={<Myorders />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}
export default Main;