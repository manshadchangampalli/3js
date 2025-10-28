import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./Scene";

function App() {
  return (
    <main>
      <Canvas>
        <Scene />
      </Canvas>
    </main>
  );
}

export default App;
