import Layout from "./three/Layout";
import { ThreeProvider } from "./three";
import NavMesh from "./three/NavMesh";
import { WallConfig, Walls } from "./data";

interface ThreeAppProps {
  wallConfig: WallConfig;
  walls: Walls;
}

const ThreeApp = ({ wallConfig, walls }: ThreeAppProps) => {
  return (
    <ThreeProvider>
      <Layout wallConfig={wallConfig} walls={walls} />
      <NavMesh wallConfig={wallConfig} walls={walls} />
    </ThreeProvider>
  );
};

export default ThreeApp;
