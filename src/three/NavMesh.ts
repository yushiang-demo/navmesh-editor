import * as THREE from "three";
import { init, NavMesh } from "recast-navigation";
import { threeToSoloNavMesh, NavMeshHelper } from "recast-navigation/three";

import { useThree } from ".";
import { useEffect, useState } from "react";
import useLayoutGeometry from "./useLayoutGeometry";
import { WallConfig, Walls } from "../data";

interface NavMeshProps {
  wallConfig: WallConfig;
  walls: Walls;
}

export const useNavMesh = ({ wallConfig, walls }: NavMeshProps) => {
  const [libReady, setLibReady] = useState(false);
  const [navMesh, setNavMesh] = useState<NavMesh | undefined>();
  const geometry = useLayoutGeometry({
    ...wallConfig,
    walls,
  });

  useEffect(() => {
    init().then(() => setLibReady(true));
  }, []);

  useEffect(() => {
    if (!libReady) return;
    if (!geometry) return;

    const { wallThickness } = wallConfig;
    const { navMesh } = threeToSoloNavMesh([new THREE.Mesh(geometry)], {
      ch: 1e-2,
      cs: wallThickness + 1e-2,
      walkableHeight: 1,
    });
    if (navMesh) {
      setNavMesh(navMesh);
    }
    return () => {
      navMesh?.destroy();
    };
  }, [geometry, libReady, wallConfig, walls]);

  return navMesh;
};

const NavMeshRenderer = ({ wallConfig, walls }: NavMeshProps) => {
  const { scene } = useThree();
  const navMesh = useNavMesh({ wallConfig, walls });

  useEffect(() => {
    if (!navMesh) return;

    const navMeshHelper = new NavMeshHelper({ navMesh });
    scene.add(navMeshHelper);

    return () => {
      scene.remove(navMeshHelper);
    };
  }, [navMesh]);

  return null;
};

export default NavMeshRenderer;
