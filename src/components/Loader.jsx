import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

const Loader = () => {
  const { progress, active, total, loaded } = useProgress();

  useEffect(() => {
    const loaderElement = document.getElementById("initial-loader");
    const fillElement = document.querySelector(".loader-fill");
    
    if (loaderElement && fillElement) {
      // Sync progress bar
      fillElement.style.animation = "none";
      fillElement.style.width = `${progress}%`;
      fillElement.style.transform = "none"; // Reset any old transforms

      const hideLoader = () => {
        loaderElement.classList.add("fade-out");
        setTimeout(() => {
          loaderElement.style.display = "none";
        }, 800);
      };

      // Failsafe condition: If active goes false after starting, OR it instantly loaded (progress 100)
      const isComplete = (progress === 100) || (!active && total > 0 && loaded === total);

      if (isComplete) {
        // Fades out once complete
        const timer = setTimeout(hideLoader, 200);
        return () => clearTimeout(timer);
      }
      
      // EMERGENCY FAILSAFE: Watchdog timer (4 seconds from navigation start)
      const WATCHDOG_MS = 4000;
      const emergencyTimer = setTimeout(() => {
        console.warn(`[Loader Watchdog] Loader dismissed automatically after ${WATCHDOG_MS}ms. Progress was stuck at ${progress}%. Assets pending: ${total - loaded}`);
        hideLoader();
      }, WATCHDOG_MS);
      return () => clearTimeout(emergencyTimer);
    }
  }, [progress, active, total, loaded]);

  return null;
};

export default Loader;
