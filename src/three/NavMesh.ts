import * as THREE from "three";
import { init, NavMesh } from "recast-navigation";
import { threeToSoloNavMesh, NavMeshHelper } from "recast-navigation/three";

import { useThree } from ".";
import { useEffect, useState } from "react";

interface NavMeshProps {
  geometry: THREE.BufferGeometry;
  wallThickness: number;
}

export const useNavMesh = ({ geometry, wallThickness }: NavMeshProps) => {
  const [navMesh, setNavMesh] = useState<NavMesh | undefined>();
  useEffect(() => {
    if (!geometry) return;

    init().then(() => {
      const { navMesh } = threeToSoloNavMesh([new THREE.Mesh(geometry)], {
        ch: 1e-2,
        cs: wallThickness + 1e-2,
        walkableHeight: 1,
      });
      if (navMesh) {
        setNavMesh(navMesh);
      }
    });
  }, [geometry, wallThickness]);

  return navMesh;
};

const NavMeshRenderer = ({ geometry, wallThickness }: NavMeshProps) => {
  const { scene } = useThree();
  const navMesh = useNavMesh({ geometry, wallThickness });

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
