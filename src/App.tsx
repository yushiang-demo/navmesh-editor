import Layout from "./three/Layout";
import { ThreeProvider } from "./three";
import useLayoutGeometry from "./three/useLayoutGeometry";
import NavMesh from "./three/NavMesh";

const wallConfig = {
  wallThickness: 0.4,
  width: 20,
  length: 20,
  wallHeight: 1,
};

const walls = [
  [
    [1, -9.75],
    [1, 1.2],
  ],
  [
    [-4.6, 1.2],
    [1.02, 1.2],
  ],
  [
    [-9.55, 1.2],
    [-7.1, 1.2],
  ],
  [
    [4, -9.75],
    [4, -4],
  ],
  [
    [4, -0.6],
    [4, 0.75],
  ],
  [
    [4, 0.55],
    [8.34, 0.55],
  ],
  [
    [-9.65, 8.5],
    [-6.8, 8.5],
  ],
  [
    [-3.75, 8.5],
    [2.5, 8.5],
  ],
  [
    [5.55, 8.5],
    [8.34, 8.5],
  ],
  [
    [-9.9, -9.75],
    [1.2, -9.75],
  ],
  [
    [3.8, -9.75],
    [8.7, -9.75],
  ],
  [
    [-9.7, -9.75],
    [-9.7, 8.7],
  ],
  [
    [8.5, -9.75],
    [8.5, 8.7],
  ],
].map(
  ([start, end]) =>
    [
      [start[0], 0, start[1]],
      [end[0], wallConfig.wallHeight, end[1]],
    ] as [number[], number[]]
);

const App = () => {
  const geometry = useLayoutGeometry({
    ...wallConfig,
    walls,
  });

  return (
    <ThreeProvider>
      <Layout geometry={geometry} {...wallConfig} />
      <NavMesh geometry={geometry} wallThickness={wallConfig.wallThickness} />
    </ThreeProvider>
  );
};

export default App;
