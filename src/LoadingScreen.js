import React, { useState, useEffect } from "react";
import logo from "./media/logo.png";
import "./styles/LoadingScreen.css";

function LoadingScreen() {
  const [isRocking, setIsRocking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const rockingTimer = setInterval(() => {
      setIsRocking(true);
      setTimeout(() => {
        setIsRocking(false);
      }, 500);
    }, 2000);

    const elapsedTimeTimer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 100);
    }, 100);

    const hideLoadingScreen = setTimeout(() => {
      clearInterval(rockingTimer);
      clearInterval(elapsedTimeTimer);
      document.body.style.overflow = "auto";
    }, 10000);

    return () => {
      clearInterval(rockingTimer);
      clearInterval(elapsedTimeTimer);
      clearTimeout(hideLoadingScreen);
    };
  }, []);

  return (
    <div className="loading-screen">
      <img src={logo} alt="logo" className={`logo ${isRocking ? "rocking" : ""}`} />
      {elapsedTime >= 10000 && (
        <div className="timeout-message">Taking longer than usual. Please try again later.</div>
      )}
    </div>
  );
}

export default LoadingScreen;

