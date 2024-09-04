import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import RegisterForm from "../component/RegisterForm.jsx";
import LoginForm from "../component/LoginForm.jsx";
import { Route, Routes } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="w-75 mx-auto text-center text-white h-75 d-flex flex-column justify-content-center align-items-center">
			<Routes>
				<Route element={<RegisterForm />} path="/signup" />
				<Route element={<LoginForm />} path="/login" />
			</Routes>
		</div>
	);
};
