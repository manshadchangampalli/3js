import { useRef } from "react";
import { Html, PositionalAudio } from "@react-three/drei";

const Sound = () => {
    const audioRef = useRef();

    const handlePlay = () => {
        audioRef.current?.play();
    };

    return (
        <>
            <Html>
                <button
                    style={{ position: "absolute" }}
                    onClick={handlePlay}>
                    Play Sound
                </button>{" "}
                {/* Needed for autoplay policy */}
            </Html>
            <PositionalAudio
                ref={audioRef}
                url="/sounds/sound.mp3"
                loop
                distance={1}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshNormalMaterial />
                </mesh>
            </PositionalAudio>
        </>
    );
};

export default Sound;
