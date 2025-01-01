import React, { useState, useContext } from "react";
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/User_context";

const Login_page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login(email, password);
            console.log("Login result:", result);

            if (result.success) {
                if (result.message === "Please update your password") {
                    console.log("Redirection vers /password-reset");
                    navigate("/password-reset");
                } else {
                    console.log("Redirection vers /");
                    navigate("/");
                }
            } else {
                setError(result.message);
            }
        } catch (err) {
            console.error("Échec de la connexion:", err);
            setError("Échec de la connexion. Veuillez réessayer.");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Mot de passe"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Se connecter
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login_page;
