
import Layout from "./three/Layout"
import {ThreeProvider} from "./three";

const App = () => {
  return <ThreeProvider>
    <Layout/>
  </ThreeProvider>;
};

export default App;
