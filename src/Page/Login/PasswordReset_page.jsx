// src/Page/PasswordReset_page.jsx
import React, { useState, useContext } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    Visibility,
    VisibilityOff,
    CheckCircle,
    Cancel,
} from "@mui/icons-material";
import { UserContext } from "../../Context/User_context";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, severity: "success", message: "" });
    const { updatePassword, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const checkPasswordCriteria = () => {
        return {
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            number: /\d/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            samePassword:
                newPassword !== "" &&
                confirmPassword !== "" &&
                newPassword === confirmPassword,
        };
    };

    const handlePasswordReset = async () => {
        const criteria = checkPasswordCriteria();
        if (!criteria.samePassword) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Les mots de passe ne correspondent pas.",
            });
            return;
        }

        const allCriteriaMet = Object.values(criteria).every(Boolean);
        if (!allCriteriaMet) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Veuillez respecter tous les critères de mot de passe.",
            });
            return;
        }

        try {
            const { success, message } = await updatePassword(newPassword);
            if (success) {
                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Votre mot de passe a été mis à jour avec succès.",
                });
                // Rediriger vers la page principale après un délai
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: message || "Une erreur est survenue.",
                });
                if (message === "Votre session a expiré. Veuillez vous reconnecter.") {
                    // Déconnecter l'utilisateur
                    logout();
                }
            }
        } catch (error) {
            setSnackbar({
                open: true,
                severity: "error",
                message: "Une erreur est survenue. Veuillez réessayer.",
            });
            console.error("Erreur lors de la mise à jour du mot de passe:", error);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler ? Vous serez déconnecté.")) {
            logout();
            navigate("/login");
        }
    };

    const criteria = checkPasswordCriteria();

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Changer de mot de passe
                </Typography>
                <Box sx={{ mt: 3, width: '100%' }}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                {criteria.length ? <CheckCircle color="success" /> : <Cancel color="error" />}
                            </ListItemIcon>
                            <ListItemText primary="Contenir au moins 8 caractères" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                {criteria.uppercase ? <CheckCircle color="success" /> : <Cancel color="error" />}
                            </ListItemIcon>
                            <ListItemText primary="Inclure au moins une majuscule" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                {criteria.number ? <CheckCircle color="success" /> : <Cancel color="error" />}
                            </ListItemIcon>
                            <ListItemText primary="Inclure au moins un chiffre" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                {criteria.specialChar ? <CheckCircle color="success" /> : <Cancel color="error" />}
                            </ListItemIcon>
                            <ListItemText primary="Inclure au moins un caractère spécial (ex: !@#$%^&*)" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                {criteria.samePassword ? <CheckCircle color="success" /> : <Cancel color="error" />}
                            </ListItemIcon>
                            <ListItemText primary="Mot de passe identique" />
                        </ListItem>
                    </List>
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Nouveau mot de passe"
                            type={showNewPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            edge="end"
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Confirmer le mot de passe"
                            type={showConfirmPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handlePasswordReset}
                        >
                            Changer le mot de passe
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Annuler
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PasswordReset;
