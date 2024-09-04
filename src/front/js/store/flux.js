const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			],
			token_user: localStorage.getItem('token'),
			list_users: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createUser: async (info_user) => {
				try {
					let response = await fetch('https://solid-winner-x79rvx767v5h65gv-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(info_user)
					})

					if (response.ok) {
						let data = await response.json();
						alert('Registro exitoso')
						console.log(data)
					} else {
						alert('Algo salio mal')
					}

				} catch (e) {
					console.log(e)
				}
			},
			loginUser: async (data_user) => {
				try {
					const response = await fetch('https://solid-winner-x79rvx767v5h65gv-3001.app.github.dev/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data_user),
					});
			
					if (!response.ok) {
						// Captura el mensaje de error devuelto por el servidor
						const errorData = await response.json();
						// console.log('Error del servidor:', errorData.error);
						throw new Error(errorData.error);
					}
			
					const data = await response.json();
					console.log('Datos del usuario logeado: ', data);
			
					if (data.access_token) {
						alert('Iniciaste sesion')
						setStore({ token_user: data.access_token });
						console.log('Bienvenido', data.user_name);
			
						localStorage.setItem('token', data.access_token);
						localStorage.setItem('email', data.email);
					} else {
						console.log('Algo salió mal');
					}
			
				} catch (error) {
					console.log('Error al intentar hacer el login:', error.message);
				}
			},
			
			getUsersList: async () => {
				let token_user = localStorage.getItem('token');
			
				if (!token_user) {
					alert('My bro, necesitas logear para ver la lista de usuarios');
					return;
				}
			
				try {
					const response = await fetch('https://solid-winner-x79rvx767v5h65gv-3001.app.github.dev/api/users', {
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token_user}`
						},
					});
					
					const data = await response.json();

					if(data.msg){
						return alert('Vuelve a iniciar sesion')
					}
								
					if (!response.ok) {
						console.error(`Error al pedir datos desde usuario:`);
						return ;
					}
			
			
					if (data.results) {
						console.log(data.results);
						// setStore({list_users: data.results})
						return data.results;
					} else {
						console.error('La lista de usuarios no está disponible en la respuesta');
						return ;
					}
			
				} catch (err) {
					console.error('Error en la solicitud:', err);
					return ;
				}
			},
			changeValueTokenUser: () => {
				setStore({token_user: null})
			}


		}
	};
};

export default getState;
