import * as THREE from "three";

const vertexShader = `
attribute vec3 color;
varying vec3 vColor;
varying vec2 vUv;

void main() {
  vColor = color;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

const fragmentShader = `
varying vec3 vColor;
varying vec2 vUv;

bool isUvBackground(vec2 uv) {
  vec2 coord = (uv * 2.0 - 1.0) * 1.5;
  if (coord.x > 0.0) {
    if (abs(coord.x) + abs(coord.y) > 1.0) {
      return true;
    }
  } else {
    if (abs(coord.y) > 0.25) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      return true;
    }
  }
}

void main() {
  vec2 uv = vec2(mod(vUv.x, 1.0), vUv.y);

  if (!isUvBackground(uv) && mod(vUv.x,2.0)<1.0) {
    gl_FragColor = vec4(vColor, 1.0);
    return;
  }

  gl_FragColor = vec4(0.0,0.0,0.0, 0.2);
}
`;

interface Point {
  x: number;
  y: number;
  z: number;
}

export default class TraceMesh extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });
    super();

    this.geometry = geometry;
    this.material = material;
    this.position.set(0, 1e-1, 0);
    this.frustumCulled = false;
  }

  private computeJointDirection(p0: Point, p1: Point, p2: Point) {
    if (!p0) {
      const vec = new THREE.Vector2(p2.x - p1.x, p2.z - p1.z);
      return new THREE.Vector2(-vec.y, vec.x).normalize();
    }
    if (!p2) {
      const vec = new THREE.Vector2(p1.x - p0.x, p1.z - p0.z);
      return new THREE.Vector2(-vec.y, vec.x).normalize();
    }

    const vec1 = new THREE.Vector2(p1.x - p0.x, p1.z - p0.z).normalize();
    const vec2 = new THREE.Vector2(p2.x - p1.x, p2.z - p1.z).normalize();
    const vec = new THREE.Vector2().addVectors(vec1, vec2).normalize();
    return new THREE.Vector2(-vec.y, vec.x).normalize();
  }

  updateTrace(points: Array<Point>) {
    const indices: number[] = [];
    const vertices: number[] = [];
    const uvs: number[] = [];
    const colors: number[] = [];
    let accLength = 0;

    for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
      const thick = 5e-1;
      const p0 = points[pointIndex - 1];
      const p1 = points[pointIndex];
      const p2 = points[pointIndex + 1];
      const thickOffset = this.computeJointDirection(p0, p1, p2).multiplyScalar(
        thick / 2.0
      );

      const point = new THREE.Vector2(p1.x, p1.z);
      const point1 = new THREE.Vector2().addVectors(point, thickOffset);
      const point2 = new THREE.Vector2().subVectors(point, thickOffset);
      vertices.push(point1.x, 1e-1, point1.y, point2.x, 1e-1, point2.y);

      if (pointIndex > 0) {
        accLength +=
          new THREE.Vector2(p1.x - p0.x, p1.z - p0.z).length() / thick;
      }
      uvs.push(accLength, 0, accLength, 1);

      const color = new THREE.Color()
        .setHSL(point.length() / 1e1, 1, 0.5)
        .toArray();
      colors.push(...color, ...color);

      if (pointIndex > 0) {
        const startIndex = (pointIndex - 1) * 2;
        indices.push(
          startIndex + 0,
          startIndex + 2,
          startIndex + 1,
          startIndex + 2,
          startIndex + 3,
          startIndex + 1
        );
      }
    }

    this.geometry.setIndex(indices);
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(vertices), 3)
    );
    this.geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uvs), 2)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(colors), 3)
    );
  }
}
