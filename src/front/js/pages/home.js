import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import RegisterForm from "../component/RegisterForm.jsx";
import LoginForm from "../component/LoginForm.jsx";
import { Route, Routes } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div style={{background: '#100E11'}} className=" w-100 h-100 mx-auto text-center text-white d-flex flex-column justify-content-center align-items-center">
			<h1><p>Hola campeon, estas en casa</p><p>descansa en esta hoguera...</p></h1>
			<img src="https://steamuserimages-a.akamaihd.net/ugc/169289717866283092/C294AAC7AA3123748D598C3A16D07AEAAAD846C0/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"></img>
		</div>
	);
};
