import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary" >
			<div className="container-fluid">
				<a className="navbar-brand" href="#" style={{color: '#06f50e'}}>Dunk</a>
				<button className="navbar-toggler" style={{color: '#06f50e'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" style={{color: '#06f50e'}}>M</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<a className="nav-link active" style={{color: '#06f50e'}} aria-current="page" href="#">Home</a>
						</li>
						<Link to='/signup'>
							<li className="nav-item">
								<a className="nav-link" style={{color: '#06f50e'}} href="#">Register</a>
							</li>
						</Link>
						<Link to='/login'>
							<li className="nav-item">
								<a className="nav-link" style={{color: '#06f50e'}} href="#">Log in</a>
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	);
};
