import { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './route/protectedRoute';
import { Roles } from './auth/roles/roles.const';
import ForgotPassword from './auth/restorePassword/forgotPassword.component';
import Preloader from './preloader/preloader.component';
import Home from './home/home.component';
import Login from './auth/login/login.component';
import SignUp from './auth/signup/signup.component';
import NavBar from './navbar/navbar.component';
import Profile from './profile/profile.component';
import Products from './products/products.component';
import AddProduct from './products/addProduct/addProduct.component';
import style from './main.module.scss';
import Product from './products/product/product.component';
import EditProduct from './products/editProduct/editProduct.component';
import EditAllProducts from './products/editProduct/editAllProducts/editAllProducts.component';
import Categories from './products/product/categories/categories.component';
import Footer from './footer/footer.component';


function Main(): JSX.Element {
    return (
        <div className={style.container}>
            <NavBar />
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<Product />} />
                    <Route path="/products/cat/:cat" element={<Categories />} />
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoute role={[Roles.user, Roles.admin]} />}>
                        <Route path="/add-products" element={<AddProduct />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/edit-products" element={<EditAllProducts />} />
                        <Route path="/edit-products/:id" element={<EditProduct />} />
                    </Route>
                </Routes>
            </Suspense>
            <Footer />
        </div>
    );
}

export default Main;
