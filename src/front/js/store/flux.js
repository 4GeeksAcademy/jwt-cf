const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null // Inicializa user como null para evitar problemas de undefined
		},
		actions: {
			login: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al iniciar sesión");
					}

					sessionStorage.setItem("accessToken", data.token);

					return data;
				} catch (error) {
					console.error("Error al iniciar sesión:", error);
					throw error;
				}
			},

			register: async (email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/registro", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({ email, password })
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al registrar usuario");
					}

					return data;
				} catch (error) {
					console.error("Error al registrar usuario:", error);
					throw error;
				}
			},

			logout: () => {
				try {
					sessionStorage.removeItem("accessToken");
					setStore({ user: null }); 
				} catch (error) {
					console.error("Error al intentar cerrar sesión:", error);
					throw error;
				}
			},

			getProtectedData: async () => {
				try {
					const token = sessionStorage.getItem("accessToken");
					if (!token) {
						throw new Error("No hay token de acceso disponible.");
					}

					const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					});

					const data = await resp.json();

					if (!resp.ok) {
						throw new Error(data.msg || "Error al obtener datos protegidos");
					}

					const { user } = getStore();
					if (JSON.stringify(user) !== JSON.stringify(data)) {
						setStore({ user: data });
						console.log("Datos del usuario actualizados en el store:", data);
					}

					return data;
				} catch (error) {
					console.error("Error al obtener datos protegidos:", error);
					throw error;
				}
			}
		}
	};
};

export default getState;











