import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context)

	const handleClick = () => {
		localStorage.removeItem('token')
		actions.changeValueTokenUser()
		alert('Cerraste sesion')
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
			<div className="container-fluid">
				<Link to='/'>
					<a className="navbar-brand" href="#" style={{ color: 'white',  }}>Dunk</a>
				</Link>
				<button className="navbar-toggler" style={{ color: '#06f50e' }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" style={{ color: '#06f50e' }}>M</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<Link to='/signup'>
							<li className="nav-item">
								<a className="nav-link" style={{ color: 'white' }} href="#">Register</a>
							</li>
						</Link>
						<Link to='/private'>
							<li className="nav-item">
								<a className="nav-link active" style={{ color: 'white' }} aria-current="page" href="">List Users</a>
							</li>
						</Link>
						<Link to='/login'>
							<li className="nav-item">
								<a className="nav-link" style={{ color: 'white' }} href="#">Log In</a>
							</li>
						</Link>
						<li className="nav-item" onClick={() => handleClick()}>
							<a className="nav-link active" style={{ color: 'white' }} aria-current="page" href="#">Log Out</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
