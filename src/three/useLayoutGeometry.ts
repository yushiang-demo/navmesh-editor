import { useEffect, useState } from "react";
import * as THREE from "three";

type Vector3Pair = [number[], number[]];

class Layout extends THREE.BufferGeometry {
  private thickness: number = 0;
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

      const boxGeometry = new THREE.BoxGeometry(this.thickness, height, depth);
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

  public setThickness(thickness: number) {
    this.thickness = thickness;
    this._updateGeometry();
  }
}

interface useWallGeometryProps {
  width: number;
  length: number;
  walls: Array<Vector3Pair>;
  wallThickness: number;
}

const useLayoutGeometry = ({
  width,
  length,
  walls,
  wallThickness,
}: useWallGeometryProps) => {
  const [geometry] = useState(new Layout());

  useEffect(() => {
    geometry.setFloor(width, length);
  }, [width, length]);

  useEffect(() => {
    geometry.setPlane(walls);
  }, [walls]);

  useEffect(() => {
    geometry.setThickness(wallThickness);
  }, [wallThickness]);

  return geometry;
};

export default useLayoutGeometry;
