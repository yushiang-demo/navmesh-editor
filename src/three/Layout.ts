import * as THREE from "three";
import { useThree } from ".";
import { useEffect } from "react";
import useWebGLRenderTarget from "./useWebGLRenderTarget";
import { WallConfig, Walls } from "../data";
import useLayoutGeometry from "./useLayoutGeometry";

interface LayoutProps {
  wallConfig: WallConfig;
  walls: Walls;
}

const vertexShader = `
varying vec3 vPos;

void main() {
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D map;
uniform vec2 resolution;
varying vec3 vPos;

void main() {
  vec2 vUv = vec2(vPos.x / resolution.x + 0.5, -vPos.z / resolution.y + 0.5);
  float texelSize = 1.0 / 512.0;

  float center = texture2D(map, vUv).r;
  float left = texture2D(map, vUv + vec2(-texelSize, 0.0)).r;
  float right = texture2D(map, vUv + vec2(texelSize, 0.0)).r;
  float top = texture2D(map, vUv + vec2(0.0, texelSize)).r;
  float bottom = texture2D(map, vUv + vec2(0.0, -texelSize)).r;

  bool isEdge = (center > 0.0) && (abs(center - left) + abs(center - right) + abs(center - top) + abs(center - bottom) > 0.0);

  vec3 color = vec3(1.0);

  if (isEdge) {
    color = vec3(0.8);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

class OutlineMaterial extends THREE.ShaderMaterial {
  constructor(map: THREE.Texture, worldSize: THREE.Vector2) {
    super({
      uniforms: {
        map: { value: map },
        resolution: {
          value: worldSize,
        },
      },
      vertexShader,
      fragmentShader,
    });
  }
}

const Layout = ({ wallConfig, walls }: LayoutProps) => {
  const { scene } = useThree();
  const topView = useWebGLRenderTarget();
  const geometry = useLayoutGeometry({
    ...wallConfig,
    walls,
  });

  useEffect(() => {
    if (!scene) return;
    const { width, length, wallHeight } = wallConfig;
    const material = new OutlineMaterial(
      topView.texture,
      new THREE.Vector2(width, length)
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    requestAnimationFrame(() => {
      const topViewSene = new THREE.Scene();
      const topViewMaterial = new THREE.MeshBasicMaterial({ color: "white" });
      const topViewMesh = new THREE.Mesh(geometry, topViewMaterial);
      topViewMesh.frustumCulled = false;
      topViewSene.add(topViewMesh);
      const camera = new THREE.OrthographicCamera(
        -width / 2,
        width / 2,
        length / 2,
        -length / 2,
        0,
        wallHeight
      );
      camera.position.set(0, wallHeight + 1e-3, 0);
      camera.lookAt(new THREE.Vector3());
      topView.render(topViewSene, camera);
    });

    return () => {
      scene.remove(mesh);
    };
  }, [scene, geometry, wallConfig, walls]);

  return null;
};

export default Layout;
