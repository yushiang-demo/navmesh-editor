import * as THREE from "three";
import { useState } from "react";
import { useThree } from ".";

const useWebGLRenderTarget = () => {
  const { renderer } = useThree();
  const [renderTarget] = useState(new THREE.WebGLRenderTarget(512, 512));

  const render = (scene: THREE.Scene, camera: THREE.Camera) => {
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
  };

  return { render, texture: renderTarget.texture };
};

export default useWebGLRenderTarget;
