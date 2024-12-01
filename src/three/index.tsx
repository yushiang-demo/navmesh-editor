import React, {
  ReactNode,
  createContext,
  useEffect,
  useContext,
  useRef,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const ThreeContext = (() => {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);

  return createContext({
    scene,
    camera,
    controls,
    renderer,
  });
})();

const useThree = () => useContext(ThreeContext);

const ThreeProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { scene, camera, renderer, controls } = useThree();

  useEffect(() => {
    if (!mountRef.current) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 20, 20);
    controls.update();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (!mountRef.current) return;
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, [scene, camera, renderer]);

  return (
    <ThreeContext.Provider value={{ scene, camera, controls, renderer }}>
      <div
        ref={mountRef}
        style={{
          width: "100vw",
          height: "100vh",
          background: "rgb(225 225 225)",
        }}
      />
      {children}
    </ThreeContext.Provider>
  );
};

export { ThreeProvider, useThree };
