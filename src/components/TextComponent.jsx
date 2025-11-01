import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const textArray = [
    "HabilKKa is Super Hero 💪",
    "Manshad is a Creative Mind 🔥",
    "Jithin is a True Problem Solver ⚙️",
    "Shuhaib is Full of Positive Energy ⚡️",
    "Ramjith is a Tech Genius 🚀",
    "Aji is the Coolest Innovator 😎",
    "HabilKKa turns every challenge into victory 🏆",
    "Manshad builds dreams into digital reality 💻",
    "Jithin codes with precision and passion 💫",
    "Shuhaib brings joy and energy to every project ✨",
    "Ramjith thinks like an engineer, acts like a leader 🧠",
    "Aji makes technology feel like magic 🎩",
    "HabilKKa leads with heart and determination ❤️",
    "Manshad turns ideas into beautiful designs 🎨",
    "Jithin always finds the smartest solution 🔍",
    "Shuhaib keeps the team motivated and smiling 😄",
    "Ramjith pushes boundaries and inspires others 🚀",
    "Aji’s creativity lights up every discussion 💡",
    "Manshad & Habil — the dynamic tech duo ⚔️",
    "The whole crew — unstoppable together 💥",
];

const lightColors = [
    "#FF6B6B", // Red-Orange
    "#FFD93D", // Yellow
    "#6BCB77", // Green
    "#4D96FF", // Blue
    "#FF6EFF", // Pink
    "#FF8C42", // Orange
    "#FFCA3A", // Bright Yellow
    "#8AC6D1", // Soft Cyan
    "#D81159", // Magenta
    "#218380", // Teal
    "#73D2DE", // Light Cyan
    "#F72585", // Hot Pink
    "#7209B7", // Purple
    "#3A0CA3", // Indigo
    "#4361EE", // Bright Blue
    "#4CC9F0", // Sky Blue
    "#F94144", // Red
    "#F8961E", // Bright Orange
    "#90BE6D", // Lime Green
    "#43AA8B", // Minty Green
];

const TextComponent = () => {
    const groupRef = useRef();
    const {
        viewport: { height, width },
    } = useThree();
    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta / 10;
    });
    return (
        <>
            <group ref={groupRef}>
                {textArray.map((message, i) => {
                    const x = (Math.random() - 0.5) * width;
                    const y = (Math.random() - 0.5) * height;
                    const z = Math.random() * 2;
                    const fontSize = 0.2 + Math.random() * 0.3;
                    const color = lightColors[Math.floor(Math.random() * lightColors.length)];

                    return (
                        <Text
                            key={i}
                            position={[x, y, z]}
                            color={color}
                            fontSize={fontSize}
                            anchorX="center"
                            anchorY="middle"
                            strokeWidth={0.005}
                            strokeColor={'white'}
                        >
                            {message}
                        </Text>
                    );
                })}
            </group>

        </>
    );
};

export default TextComponent;
