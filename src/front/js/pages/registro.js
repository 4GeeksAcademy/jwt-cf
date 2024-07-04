import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Registro = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            setError("Por favor ingresa un correo electrónico y una contraseña.");
            return;
        }

        try {
            const data = await actions.register(email, password);
            console.log("Usuario registrado:", data);
            navigate("/");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setError("Error al registrar usuario. Por favor intenta nuevamente.");
        }
    };

    return (
        <div className="container-fluid py-2">
            <h1>Ingresa tus datos</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-primary">Registrarme</button>
            </form>
            <Link to="/">Volver al Home</Link>
        </div>
    );
};
