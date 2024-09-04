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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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
				try{
					let response = await fetch('https://solid-winner-x79rvx767v5h65gv-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(info_user)
					})

					if(response.ok){
						let data = await response.json();
						alert('Registro exitoso')
						console.log(data)
					} else {
						alert('Algo salio mal')
					}
					
				} catch (e){
					console.log(e)
				}
			},
			loginUser: async (data_user) => {
				try {
					const response =  await fetch('https://solid-winner-x79rvx767v5h65gv-3001.app.github.dev/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'							
						},
						body: JSON.stringify(data_user)
					})

					const data = await response.json()
					console.log('Datos del usuario: ', data)
					if(data.access_token){
						console.log('Bienvenido', data.user_name)
						localStorage.setItem('token', data.access_token)
						localStorage.setItem('name', data.name)
						localStorage.setItem('email', data.email)
					} else {
						console.log('Algo salio mal')
					}
					
					
				} catch{
					console.log('Error al intentar hacer el login')
				}
			}
		}
	};
};

export default getState;
