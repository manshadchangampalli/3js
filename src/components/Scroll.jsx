import { Html, Scroll, ScrollControls } from "@react-three/drei";
import Images from "./Images";

const ScrollComponent = () => {
    return (
        <ScrollControls
            pages={3}
            damping={0.1}>
            <Scroll>
                <Html fullscreen>
                    <div
                        style={{
                            color: "white",
                            position: "absolute",
                            width: window.innerWidth / 2,
                            left: window.innerWidth / 2,
                            height: window.innerHeight,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 150,
                        }}>
                        Hello!
                    </div>
                </Html>
                <Images />
            </Scroll>
        </ScrollControls>
    );
};

export default ScrollComponent;
