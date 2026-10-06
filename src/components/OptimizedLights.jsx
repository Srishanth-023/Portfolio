import { ContactShadows, SoftShadows } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useStore } from "../store";

export const OptimizedLights = () => {
  const quality = useStore((state) => state.quality);
  const { gl } = useThree();
  const dirLightRef = useRef();

  useEffect(() => {
    // We disable autoUpdate for shadows unless the light is moving (which it isn't in Phase 1)
    if (gl.shadowMap) {
      gl.shadowMap.autoUpdate = false;
      gl.shadowMap.needsUpdate = true;
    }
  }, [gl, quality]);

  const castShadow = quality !== 'low';
  const mapSize = quality === 'high' ? 1024 : 512;

  return (
    <>
      {quality === 'high' && <SoftShadows size={10} samples={16} focus={0.5} />}
      <directionalLight
        ref={dirLightRef}
        castShadow={castShadow}
        position={[10, 10, 10]}
        intensity={2}
        shadow-mapSize={[mapSize, mapSize]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 50]} />
      </directionalLight>

      <ambientLight intensity={0.5} />
      <hemisphereLight skyColor='#b1e1ff' groundColor='#000000' intensity={1} />

      {quality === 'low' && (
        <ContactShadows
          position={[0, -6.49, 0]}
          opacity={0.5}
          scale={50}
          blur={2}
          far={10}
          resolution={256}
        />
      )}
    </>
  );
};
