import { useState, useEffect } from "react";
import { getLeaderInfo } from "./config";
import { SplashScreen } from "./components/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
import { PageTransition } from "./components/PageTransition";
import { Navigation } from "./components/BottomNavigation";
import { RightPanel } from "./components/RightPanel";
import { FilActualite } from "./pages/FilActualite";
import { Notifications } from "./pages/Notifications";
import { Create } from "./pages/Create";
import { Organization } from "./pages/Organization";
import { Profile } from "./pages/Profile";
import "./App.css";
import "./pages/pages.css";

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingApp, setLoadingApp] = useState(false);
  const [currentAdn, setCurrentAdn] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const savedAdn = localStorage.getItem("userAdn");
    if (savedAdn) {
      setCurrentAdn(savedAdn);
      setIsLoggedIn(true);
      setLoadingApp(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !loadingApp) {
      const timer = setTimeout(() => {
        setLoadingApp(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, loadingApp]);

  // Utilise l'ADN de l'utilisateur connecté
  const currentLeader = currentAdn ? getLeaderInfo(currentAdn) : null;

  // Gère la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("userAdn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setLoadingApp(false);
    setCurrentAdn(null);
  };

  const pages = {
    home: <FilActualite />,
    notifications: <Notifications />,
    create: <Create />,
    organization: <Organization />,
    profile: <Profile onLogout={handleLogout} />,
  };

  return (
    <>
      {!splashDone && <SplashScreen onFinish={() => setSplashDone(true)} />}
      {splashDone && !isLoggedIn && (
        <LoginPage
          onLogin={(adn) => {
            setCurrentAdn(adn);
            setIsLoggedIn(true);
          }}
        />
      )}
      {splashDone && isLoggedIn && !loadingApp && (
        <SplashScreen onFinish={() => setLoadingApp(true)} />
      )}
      {splashDone && isLoggedIn && loadingApp && (
        <div className="app-wrapper">
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

          <div className="pages-container">
            {Object.entries(pages).map(([pageId, pageComponent]) => (
              <PageTransition key={pageId} isActive={currentPage === pageId}>
                {pageComponent}
              </PageTransition>
            ))}
          </div>

          <RightPanel leader={currentLeader} show={currentPage === "home"} />
        </div>
      )}
    </>
  );
}

export default App;
