import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.login(email, password);
            if (response && response.token) {
                // Redirigir a la página de inicio, por ejemplo
                window.location.href = "/vista-protegida";
            }
        } catch (error) {
            setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
        }
    };

    return (
        <div className="container-fluid py-2">
            <h1>Inicia Sesión</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary">Inicia Sesión</button>
            </form>
            <Link to="/">Volver al Home</Link>
        </div>
    );
};
