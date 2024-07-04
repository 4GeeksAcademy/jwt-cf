import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await actions.logout();
			navigate("/");
		} catch (error) {
			console.error("Error al cerrar sesión:", error);
		}
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="ml-auto">
					<button className="btn btn-danger" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

