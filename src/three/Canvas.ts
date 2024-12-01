import * as THREE from "three";
import { useThree } from ".";
import { useEffect } from "react";

interface CanvasProps {}

const Canvas = ({}: CanvasProps) => {
  const { scene } = useThree();

  useEffect(() => {
    if (!scene) return;
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
    };
  }, [scene]);

  return null;
};

export default Canvas;
