import { Html, useAnimations, useGLTF } from "@react-three/drei";

const Animation = () => {
    const model = useGLTF("./model/model.gltf");
    const animations = useAnimations(model?.animations, model?.scene);
    console.log("🚀 ~ Scene ~ model:", animations);
    return (
        <>
            <mesh position={[-0.5, -1, 0]}>
                <primitive object={model?.scene} />
            </mesh>
            <Html fullscreen>
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "20px",
                        display: "flex",
                        gap: "20px",
                    }}>
                    {animations?.names?.map((animation) => {
                        console.log(animation);
                        return (
                            <button
                                onClick={() => {
                                    Object.values(animations?.actions).forEach((action) => action.stop());
                                    animations?.actions?.[animation]?.play();
                                }}
                                style={{
                                    padding: "8px 20px",
                                }}>
                                {animation}
                            </button>
                        );
                    })}
                </div>
            </Html>
        </>
    );
};

export default Animation;
