import ThreeApp from "./ThreeApp";
import { wallConfig, walls } from "./data";

const App = () => {
  return <ThreeApp wallConfig={wallConfig} walls={walls} />;
};

export default App;
