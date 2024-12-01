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

  if (isUvBackground(uv)) {
    discard;
  }

  gl_FragColor = vec4(vColor, 1.0);
}
`;

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

  updateTrace(points: Array<{ x: number; y: number; z: number }>) {
    const { attributes } = points.reduce<{
      latestPoint: { x: number; y: number; z: number } | undefined;
      attributes: {
        indices: number[];
        vertices: number[];
        uvs: number[];
        colors: number[];
      };
    }>(
      (prev, point, index) => {
        const { attributes, latestPoint } = prev;
        if (!latestPoint)
          return {
            ...prev,
            latestPoint: point,
          };

        const prePoint = new THREE.Vector2(latestPoint.x, latestPoint.z);
        const curPoint = new THREE.Vector2(point.x, point.z);
        const direction = new THREE.Vector2()
          .subVectors(curPoint, prePoint)
          .normalize();

        const thick = 5e-1;
        const thickOffset = new THREE.Vector2(
          -direction.y,
          direction.x
        ).multiplyScalar(thick / 2);
        const uvLength =
          new THREE.Vector2().subVectors(curPoint, prePoint).length() / thick;

        const point1 = new THREE.Vector2().addVectors(prePoint, thickOffset);
        const uv1 = [0, 0];
        const point2 = new THREE.Vector2().subVectors(prePoint, thickOffset);
        const uv2 = [0, 1];
        const point3 = new THREE.Vector2().addVectors(curPoint, thickOffset);
        const endUvX =
          index === points.length - 1 ? Math.floor(uvLength) : uvLength;
        const uv3 = [endUvX, 0];
        const point4 = new THREE.Vector2().subVectors(curPoint, thickOffset);
        const uv4 = [endUvX, 1];

        attributes.vertices.push(
          point1.x,
          1e-1,
          point1.y,
          point2.x,
          1e-1,
          point2.y,
          point3.x,
          1e-1,
          point3.y,
          point4.x,
          1e-1,
          point4.y
        );

        const color1 = new THREE.Color()
          .setHSL(prePoint.length() / 1e1, 1, 0.5)
          .toArray();
        const color2 = new THREE.Color()
          .setHSL(curPoint.length() / 1e1, 1, 0.5)
          .toArray();
        attributes.colors.push(...color1, ...color1, ...color2, ...color2);

        const startIndex = (index - 1) * 4;
        attributes.indices.push(
          startIndex + 0,
          startIndex + 2,
          startIndex + 1,
          startIndex + 2,
          startIndex + 3,
          startIndex + 1
        );

        attributes.uvs.push(...uv1, ...uv2, ...uv3, ...uv4);

        return {
          latestPoint: point,
          attributes,
        };
      },
      {
        latestPoint: undefined,
        attributes: {
          indices: [],
          vertices: [],
          uvs: [],
          colors: [],
        },
      }
    );

    this.geometry.setIndex(attributes.indices);
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(attributes.vertices), 3)
    );
    this.geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(attributes.uvs), 2)
    );
    this.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(new Float32Array(attributes.colors), 3)
    );
  }
}
