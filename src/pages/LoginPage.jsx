import { useState } from "react";
import { USERS } from "../config";
import "./LoginPage.css";

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Chercher l'utilisateur
    const user = USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      // Sauvegarder dans localStorage
      localStorage.setItem("userAdn", user.adn);
      localStorage.setItem("userName", user.name);

      // Lancer l'animation
      setIsSubmitting(true);

      // Attendre l'animation (1.5s) puis rediriger
      setTimeout(() => {
        onLogin(user.adn);
      }, 1500);
    } else {
      setError("Identifiants incorrects");
    }
  };

  return (
    <div className="login-container">
      <div className={`login-wrapper ${isSubmitting ? "submitting" : ""}`}>
        {/* Panel Rouge Animé - Desktop Only */}
        <div className="login-panel">
          <div className="login-panel-content">
            <img
              src="/assets/logo.png"
              alt="A21 Academy"
              className="login-panel-logo"
            />
            <h2>Bienvenue à A21 MEDIA</h2>
            <p>
              Connectez-vous pour accéder à votre plateforme collabore de
              contenu
            </p>
          </div>
        </div>

        {/* Formulaire de Connexion */}
        <div className="login-form-section">
          <form onSubmit={handleSubmit}>
            <img
              src="/assets/logo.png"
              alt="A21 Academy"
              className="login-form-logo"
            />

            <h1>Se connecter</h1>

            {error && <div className="login-error">{error}</div>}

            <div className="login-form-group">
              <input
                type="text"
                placeholder="Entrez votre ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="login-form-group">
              <input
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-submit-btn">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
