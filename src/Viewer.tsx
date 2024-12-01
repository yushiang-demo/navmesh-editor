import Layout from "./three/Layout";
import { ThreeProvider } from "./three";
import NavMesh from "./three/NavMesh";
import { WallConfig, Walls } from "./data";
import NavRaycaster from "./three/NavRaycaster";

interface ViewerProps {
  wallConfig: WallConfig;
  walls: Walls;
}

const Viewer = ({ wallConfig, walls }: ViewerProps) => {
  return (
    <ThreeProvider>
      <Layout wallConfig={wallConfig} walls={walls} />
      <NavMesh wallConfig={wallConfig} walls={walls} />
      <NavRaycaster wallConfig={wallConfig} walls={walls} />
    </ThreeProvider>
  );
};

export default Viewer;
