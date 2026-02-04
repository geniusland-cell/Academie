import { useState, useEffect } from "react";
import "./SplashScreen.css";

export const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-logo">
        <img src="/assets/logo.png" alt="Academy 21" />
      </div>
    </div>
  );
};
