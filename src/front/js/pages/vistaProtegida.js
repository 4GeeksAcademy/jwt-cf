import React, { useContext, useEffect } from "react";
import { Navbar } from "../component/navbar";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const VistaProtegida = () => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");

        if (!accessToken) {
            navigate("/");
        } else {
            actions.getProtectedData()
                .then(() => console.log("Datos protegidos cargados correctamente"))
                .catch(error => console.error("Error al cargar datos protegidos:", error));
        }
    }, [actions, navigate]);

    const { user } = store;

    return (
        <>
            <Navbar />
            <div className="container">
                <h1>
                    {user && (
                        <p>Hola, {user.email}, gracias por iniciar sesión!</p>
                    )}
                </h1>
            </div>
        </>
    );
};






