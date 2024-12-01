import Viewer from "./Viewer";
import { wallConfig, walls } from "./data";

const App = () => {
  return <Viewer wallConfig={wallConfig} walls={walls} />;
};

export default App;
