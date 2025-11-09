import { TransformControls, useTexture } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

// 20 Sample images with names
const PROJECTS = [
    { url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop", name: "Abstract Art" },
    { url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=800&fit=crop", name: "Digital Wave" },
    { url: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop", name: "Neon Dreams" },
    { url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=800&fit=crop", name: "Color Burst" },
    { url: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=800&fit=crop", name: "Gradient Flow" },
    { url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=800&fit=crop", name: "Prism Light" },
    { url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=800&fit=crop", name: "Rainbow Sky" },
    { url: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=800&fit=crop", name: "Cosmic Glow" },
    { url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop", name: "Mountain Peak" },
    { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop", name: "Ocean View" },
    { url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&h=800&fit=crop", name: "City Lights" },
    { url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop", name: "Desert Sand" },
    { url: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&h=800&fit=crop", name: "Forest Path" },
    { url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=800&fit=crop", name: "Sunset Glow" },
    { url: "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&h=800&fit=crop", name: "Aurora Night" },
    { url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=800&fit=crop", name: "Crystal Clear" },
    { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop", name: "Beach Waves" },
    { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop", name: "Alpine View" },
    { url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop", name: "Nature Path" },
    { url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=800&fit=crop", name: "Star Trail" },
];
const textureSize = 1024;

const ImageAtlas = () => {
    const textures = useTexture(PROJECTS?.map((i) => i.url));
    const atlasTexture = useMemo(() => {
        const imageCanvas = document.createElement("canvas");
        const atlasSize = Math.ceil(Math.sqrt(PROJECTS.length));
        imageCanvas.width = atlasSize * textureSize;
        imageCanvas.height = atlasSize * textureSize;
        const ctx = imageCanvas.getContext("2d");
        ctx.fillRect(0, 0, imageCanvas.width, imageCanvas.height);
        console.log(ctx);

        textures?.forEach((texture, i) => {
            const col = i % atlasSize;
            const row = Math.floor(i / atlasSize);
            const x = col * textureSize;
            const y = row * textureSize;
            if (texture.image) {
                ctx.drawImage(texture.image, x, y, textureSize, textureSize);
            }
        });
        const imageTexture = new THREE.CanvasTexture(imageCanvas);
        imageTexture.needsUpdate = true;
        return imageTexture;
    }, [textures]);
    return (
        <mesh>
            <planeGeometry args={[5, 5]} />
            <meshBasicMaterial map={atlasTexture} />
        </mesh>
    );
};

export default ImageAtlas;
