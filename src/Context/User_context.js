// src/Context/User_context.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import Services from "../Service/Provider_service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
	const [firstname, setFirstname] = useState(
		localStorage.getItem("firstname") || ""
	);
	const [lastname, setLastname] = useState(
		localStorage.getItem("lastname") || ""
	);
	const [needsPasswordUpdate, setNeedsPasswordUpdate] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(() => {
		const storedAuth = localStorage.getItem("isAuthenticated");
		console.log("Initial isAuthenticated:", storedAuth === "true");
		return storedAuth === "true";
	});
	const [isAdmin, setIsAdmin] = useState(
		localStorage.getItem("isAdmin") === "true"
	);
	const [users, setUsers] = useState([]);

	// Sauvegarder les informations dans localStorage à chaque changement d'état
	useEffect(() => {
		console.log("Updating localStorage:", {
			idUser,
			firstname,
			lastname,
			isAuthenticated,
			isAdmin,
		});
		localStorage.setItem("idUser", idUser);
		localStorage.setItem("firstname", firstname);
		localStorage.setItem("lastname", lastname);
		localStorage.setItem("isAuthenticated", isAuthenticated);
		localStorage.setItem("isAdmin", isAdmin);
	}, [idUser, firstname, lastname, isAuthenticated, isAdmin]);

	// Fonction de déconnexion
	const logout = useCallback(() => {
		console.log("Logging out");
		setIdUser(null);
		setFirstname("");
		setLastname("");
		setIsAuthenticated(false);
		setIsAdmin(false);
		setNeedsPasswordUpdate(false);
		localStorage.clear();
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			console.log("Logout event received");
			logout();
		};

		window.addEventListener("logout", handleLogout);

		return () => {
			window.removeEventListener("logout", handleLogout);
		};
	}, [logout]);

	// Fonction de login
	const login = useCallback(async (email, password) => {
		try {
			const response = await Services.UserService.Login(email, password);
			console.log("Login response:", response);
			if (response.status === 200 && response.user) {
				// Stockage du token et mise à jour des informations d'authentification
				localStorage.setItem("authToken", response.token);

				setIdUser(response.user.id_user);
				setFirstname(response.user.firstname);
				setLastname(response.user.lastname);
				setIsAdmin(response.user.is_admin);

				if (response.message === "Please update your password") {
					setNeedsPasswordUpdate(true);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(true);
				}
				return {
					success: true,
					message: response.message,
					user: response.user,
				};
			} else {
				return { success: false, message: response.message };
			}
		} catch (error) {
			console.error("Erreur lors de la connexion:", error);
			let errorMessage = "Une erreur est survenue. Veuillez réessayer.";
			if (error.response) {
				if (
					error.response.data.error === "Error: Mot de passe invalide"
				) {
					errorMessage = "Le mot de passe est incorrect.";
				} else if (
					error.response.data.error ===
					"Error: Utilisateur non trouvé"
				) {
					errorMessage = "L'adresse mail est incorrecte.";
				}
			} else if (error.request) {
				errorMessage =
					"Le serveur ne répond pas. Veuillez réessayer plus tard.";
			}
			return { success: false, message: errorMessage };
		}
	}, []);

	// Fonction de mise à jour du mot de passe
	const updatePassword = useCallback(
		async (newPassword) => {
			try {
				const response = await Services.UserService.UpdatePassword(
					idUser,
					newPassword
				);
				console.log("UpdatePassword response:", response);
				if (response.status === 200) {
					// Si le backend retourne un nouveau token, stockez-le
					if (response.token) {
						localStorage.setItem("authToken", response.token);
					}
					setIsAuthenticated(true);
					setNeedsPasswordUpdate(false);
					return {
						success: true,
						message: "Mot de passe mis à jour avec succès.",
					};
				} else {
					return { success: false, message: response.message };
				}
			} catch (error) {
				console.error(
					"Erreur lors de la mise à jour du mot de passe:",
					error
				);
				let errorMessage =
					"Erreur lors de la mise à jour du mot de passe.";
				if (
					error.response &&
					(error.response.status === 401 ||
						error.response.status === 403)
				) {
					errorMessage =
						"Votre session a expiré. Veuillez vous reconnecter.";
					logout();
				}
				return { success: false, message: errorMessage };
			}
		},
		[idUser, logout]
	);

	// Fonction pour récupérer les utilisateurs
	const fetchUsers = useCallback(async () => {
		try {
			const response = await Services.UserService.getUser();
			console.log("FetchUsers response:", response);
			if (response && response.data) {
				const filteredUsers = response.data.filter(
					(user) => !user.is_admin
				);
				setUsers(filteredUsers);
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				console.error("Session expirée.");
				logout();
			} else {
				console.error(
					"Erreur lors de la récupération des utilisateurs:",
					error
				);
			}
		}
	}, [logout]);

	return (
		<UserContext.Provider
			value={{
				idUser,
				setIdUser,
				firstname,
				setFirstname,
				lastname,
				setLastname,
				isAuthenticated,
				setIsAuthenticated,
				isAdmin,
				setIsAdmin,
				needsPasswordUpdate,
				setNeedsPasswordUpdate,
				users,
				fetchUsers,
				logout,
				login,
				updatePassword,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
