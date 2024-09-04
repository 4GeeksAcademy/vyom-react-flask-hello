import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import RegisterForm from "./component/RegisterForm.jsx";
import LoginForm from "./component/LoginForm.jsx";
import PrivateList from "./component/PrivateList.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="w-100 h-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="h-100 w-100 text-center text-white d-flex flex-column justify-content-center align-items-center">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<RegisterForm />} path="/signup" />
                            <Route element={<LoginForm />} path="/login" />
                            <Route element={<PrivateList />} path="/private"/>
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
