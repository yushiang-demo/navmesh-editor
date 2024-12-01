import * as THREE from "three";
import { useThree } from ".";
import { useEffect, useRef } from "react";
import { WallConfig, Walls } from "../data";
import { useNavMesh } from "./NavMesh";
import { NavMeshQuery } from "recast-navigation";
import TraceMesh from "./TraceMesh";

interface NavRaycasterProps {
  wallConfig: WallConfig;
  walls: Walls;
}
const NavRaycaster = ({ wallConfig, walls }: NavRaycasterProps) => {
  const traceMesh = useRef(new TraceMesh());
  const { scene, renderer, camera, controls } = useThree();
  const { navMesh, navMeshHelper } = useNavMesh({ wallConfig, walls });

  useEffect(() => {
    if (!scene) return;
    scene.add(traceMesh.current);
    return () => {
      scene.remove(traceMesh.current);
    };
  }, [scene]);

  useEffect(() => {
    if (!renderer || !navMeshHelper || !navMesh) return;

    const navMeshQuery = new NavMeshQuery(navMesh);
    const raycaster = new THREE.Raycaster();
    let startPoint: THREE.Vector3 | null = null;

    const raycastFromPointer = (normalizedX: number, normalizedY: number) => {
      const pointer = new THREE.Vector2(normalizedX, normalizedY);

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects([navMeshHelper]);
      const target = intersects[0];
      if (!target) return null;
      return target.point;
    };

    const onNav = (startPoint: THREE.Vector3, endPoint: THREE.Vector3) => {
      const { point: start } = navMeshQuery.findClosestPoint({
        x: startPoint.x,
        y: startPoint.y,
        z: startPoint.z,
      });

      const { point: end } = navMeshQuery.findClosestPoint({
        x: endPoint.x,
        y: endPoint.y,
        z: endPoint.z,
      });

      return navMeshQuery.computePath(start, end);
    };

    const onPointerDown = (event: PointerEvent) => {
      const result = raycastFromPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      if (result) {
        controls.enabled = false;
        startPoint = result;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const result = raycastFromPointer(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      if (startPoint && result) {
        const { path } = onNav(startPoint, result);
        traceMesh.current.updateTrace(path);
      }
    };

    const onPointerUp = () => {
      controls.enabled = true;
      startPoint = null;
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    return () => {
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
    };
  }, [renderer, navMesh]);

  return null;
};

export default NavRaycaster;
