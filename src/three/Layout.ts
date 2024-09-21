import * as THREE from "three";
import { init } from "recast-navigation";
import { threeToSoloNavMesh, NavMeshHelper } from "recast-navigation/three";

type Vector3Pair = [number[], number[]];

const PLANE_THICKNESS = 0.4;

class Walls extends THREE.BufferGeometry {
  private planeArray: Vector3Pair[] = [];
  private floorVertices: number[] = [];

  constructor() {
    super();
  }

  private _updateGeometry(): void {
    const planeVertices = this.planeArray.flatMap(([min, max]) => {
      const rotationMat = new THREE.Matrix4().lookAt(
        new THREE.Vector3(min[0], 0, min[2]),
        new THREE.Vector3(max[0], 0, max[2]),
        new THREE.Vector3(0, 1, 0)
      );
      const quaternion = new THREE.Quaternion().setFromRotationMatrix(
        rotationMat
      );

      const depth = new THREE.Vector2(
        max[0] - min[0],
        max[2] - min[2]
      ).length();
      const height = max[1] - min[1];

      const boxGeometry = new THREE.BoxGeometry(PLANE_THICKNESS, height, depth);
      boxGeometry.applyQuaternion(quaternion);
      boxGeometry.translate(
        (max[0] + min[0]) / 2,
        (max[1] + min[1]) / 2,
        (max[2] + min[2]) / 2
      );

      const vertices = [...boxGeometry.attributes.position.array];
      const index = [...(boxGeometry.getIndex()?.array || [])];
      const data = index.flatMap((index) => [
        vertices[index * 3],
        vertices[index * 3 + 1],
        vertices[index * 3 + 2],
      ]);
      return data;
    });

    this.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([...this.floorVertices.flat(), ...planeVertices]),
        3
      )
    );
    this.computeVertexNormals();
  }

  public setFloor(width: number, length: number) {
    const floor = [
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [-1, 0, 1],
    ].flatMap(([x, y, z]) => [(x * width) / 2, y, (z * length) / 2]);
    this.floorVertices = floor;
    this._updateGeometry();
  }

  public setPlane(data: Vector3Pair[]): void {
    if (!data) return;
    this.planeArray = data;
    this._updateGeometry();
  }
}

import { useThree } from ".";
import { useEffect, useState } from "react";

const Layout = () => {
  const { scene } = useThree();
  const [geometry] = useState(new Walls());

  useEffect(() => {
    if (!scene) return;

    const material = new THREE.MeshPhongMaterial({ color: "white" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
    };
  }, [scene, geometry]);

  useEffect(() => {
    if (!geometry) return;

    geometry.setPlane([
      [
        [1, 0, -10],
        [1, 1, 1.2],
      ],
      [
        [-4.6, 0, 1.2],
        [1.02, 1, 1.2],
      ],
      [
        [-9.55, 0, 1.2],
        [-7.1, 1, 1.2],
      ],
      [
        [4, 0, -10],
        [4, 1, -4],
      ],
      [
        [4, 0, -0.6],
        [4, 1, 0.55],
      ],
      [
        [4.25, 0, 0.55],
        [8.34, 1, 0.55],
      ],
      [
        [-9.65, 0, 8.5],
        [-6.8, 1, 8.5],
      ],
      [
        [-3.75, 0, 8.5],
        [2.5, 1, 8.5],
      ],
      [
        [5.55, 0, 8.5],
        [8.34, 1, 8.5],
      ],
      [
        [-9.65, 0, -9.75],
        [1.02, 1, -9.75],
      ],
      [
        [4.25, 0, -9.75],
        [8.34, 1, -9.75],
      ],
      [
        [-9.75, 0, -10],
        [-9.75, 1, 8.7],
      ],
      [
        [8.5, 0, -10],
        [8.5, 1, 8.7],
      ],
    ]);
    geometry.setFloor(20, 20);

    let navMeshHelper: NavMeshHelper;
    init().then(() => {
      const { navMesh } = threeToSoloNavMesh([new THREE.Mesh(geometry)], {
        ch: 1e-2,
        cs: PLANE_THICKNESS + 1e-2,
        walkableHeight: 1,
      });
      if (navMesh) {
        navMeshHelper = new NavMeshHelper({ navMesh });
        scene.add(navMeshHelper);
      }
    });

    return () => {
      if (navMeshHelper) {
        scene.remove(navMeshHelper);
      }
    };
  }, [geometry]);

  return null;
};

export default Layout;
