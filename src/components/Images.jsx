import { Image, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const Images = () => {
    const {
        viewport: { width, height },
    } = useThree();
    const groupRef = useRef();
    const scroll = useScroll();

    useFrame(() => {
        console.log(scroll.range(0,1/3))
    });
    return (
        <group ref={groupRef}>
            <Image
                scale={[width / 2, height]}
                position={[-width / 4, 0, 0]}
                url="./images/1.jpg"
            />
            <Image
                position={[0, -height, 0]}
                url="./images/2.jpg"
            />
            <Image
                position={[2, -height, 0]}
                url="./images/3.jpg"
            />
            <Image
                position={[0, -height * 2, 0]}
                url="./images/4.jpg"
            />
        </group>
    );
};

export default Images;
