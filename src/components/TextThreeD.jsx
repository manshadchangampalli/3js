import { Center, Text3D } from "@react-three/drei";

const TextThreeD = () => {
    return (
        <>
            <Center position={[0, 0, 0]}>
                <Text3D
                    size={1}
                    height={0.3}
                    font={"./fonts/Tektur_Bold.json"}>
                    Manshad
                    <meshNormalMaterial color={"#ffffff"} />
                </Text3D>
            </Center>
        </>
    );
};

export default TextThreeD;
