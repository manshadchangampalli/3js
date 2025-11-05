import { Canvas } from "@react-three/fiber";
import "./App.css";
import Scene from "./Scene";
import { Fisheye } from "@react-three/drei";
import ImageGallery from "./components/infiniteImageGallery";

function App() {
  return (
    // <main>
    //   <Canvas shadows>
    //     {/* <Fisheye> */}
    //     <Scene />
    //     {/* </Fisheye> */}
    //   </Canvas>
    // </main>
    <ImageGallery />
  );
}

export default App;
