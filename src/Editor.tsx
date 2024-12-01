import { ThreeProvider } from "./three";
import Canvas from "./three/Canvas";

interface EditorProps {}

const Editor = ({}: EditorProps) => {
  return (
    <ThreeProvider>
      <Canvas />
    </ThreeProvider>
  );
};

export default Editor;
