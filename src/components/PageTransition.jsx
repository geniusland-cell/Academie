import { useEffect, useState } from "react";
import "./PageTransition.css";

export const PageTransition = ({ children, isActive }) => {
  const [shouldRender, setShouldRender] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive && shouldRender) {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isActive, shouldRender]);

  return (
    <div
      className={`page-transition ${isActive ? "active" : ""} ${!isActive && shouldRender ? "exit" : ""}`}
      onAnimationEnd={() => {
        if (!isActive) {
          setShouldRender(false);
        }
      }}
    >
      {shouldRender && children}
    </div>
  );
};
