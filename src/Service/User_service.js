// src/Service/User_service.js
import axios from "./AxiosConfig";

// Fonction pour récupérer les utilisateurs
async function getUser() {
	try {
		const response = await axios.get("/user/all");
		return response.data;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des utilisateurs:",
			error
		);
		throw error;
	}
}

// Fonction de connexion
export const Login = async (email, password) => {
	try {
		const response = await axios.post("/user/login", {
			email: email,
			password: password,
		});

		const data = response.data;
		const token = data.token;

		// Stocker le token
		if (token) {
			localStorage.setItem("authToken", token);
		} else {
			console.error("Token non reçu lors de la connexion");
		}

		return data;
	} catch (error) {
		console.error("Erreur lors de la connexion:", error);
		throw error;
	}
};

// Fonction pour mettre à jour le mot de passe
export const UpdatePassword = async (idUser, newPassword) => {
	try {
		const response = await axios.post(`/user/password/${idUser}`, {
			newPassword: newPassword,
		});
		return response.data;
	} catch (error) {
		console.error("Erreur lors de la mise à jour du mot de passe:", error);
		throw error;
	}
};

export default {
	UpdatePassword,
	Login,
	getUser,
};
