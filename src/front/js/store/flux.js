const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Función para gestionar el login
			login: async (email, password) => {
				try {
					// Hacer la solicitud al backend para iniciar sesión
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

					// Guardar el token en el localStorage o sessionStorage
					sessionStorage.setItem("accessToken", data.token);

					// Retornar los datos si es necesario
					return data;
				} catch (error) {
					console.error("Error al iniciar sesión:", error);
					throw error; // Puedes manejar el error según tus necesidades
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;



