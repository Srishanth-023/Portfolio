import { Suspense, useEffect, useRef, useState } from "react";
import { Preload } from "@react-three/drei";
import { r3fTunnel } from "../tunnel";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";
import { OptimizedLights } from "../components/OptimizedLights";
import { useStore } from "../store";

const Home = () => {
  const audioRef = useRef(null);
  
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const quality = useStore((state) => state.quality);
  // Calculate dynamic DPR cap based on device tier
  const dprCap = quality === 'high' ? 2 : (quality === 'medium' ? 1.5 : 1);

  useEffect(() => {
    if (isPlayingMusic) {
      if (!audioRef.current) {
        // Load only when requested
        import('../assets/sakura.mp3').then(module => {
          audioRef.current = new Audio(module.default);
          audioRef.current.volume = 0.4;
          audioRef.current.loop = true;
          audioRef.current.play().catch(console.error);
        });
      } else {
        audioRef.current.play().catch(console.error);
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      // Don't pause on simple re-renders, but since this effect only runs on isPlayingMusic changes,
      // it's fine. Wait, if we unmount Home, we want to pause it, but if we just change isPlayingMusic,
      // we don't want the cleanup to pause it immediately before it plays.
      // Actually, since we return the cleanup, it runs BEFORE the next effect.
      // It's safer to only pause on unmount using a separate useEffect.
    };
  }, [isPlayingMusic]);

  // Dedicated unmount cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    // If screen width is less than 768px, adjust the scale and position
    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <div
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <r3fTunnel.In>
          <OptimizedLights />

          <Suspense fallback={null}>
            <Sky isRotating={isRotating} />
            <Island
              isRotating={isRotating}
              setIsRotating={setIsRotating}
              setCurrentStage={setCurrentStage}
              position={islandPosition}
              rotation={[0.1, 4.7077, 0]}
              scale={islandScale}
            />
          </Suspense>

          <Suspense fallback={null}>
            <Bird />
            <Plane
              isRotating={isRotating}
              position={biplanePosition}
              rotation={[0, 20.1, 0]}
              scale={biplaneScale}
            />
          </Suspense>
          
          <Preload all />
        </r3fTunnel.In>
      </div>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>
    </section>
  );
};

export default Home;
