import React from "react";
import { Link } from "react-router-dom";

export const Registro = () => {

    return (
        <div className="container-fluid py-2">
            <h1>Ingresa tus datos</h1>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Registrarme</button>
            </form>
            <Link to="/">Volver al Home</Link>
        </div>
    );
};