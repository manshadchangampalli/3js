import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import { EffectComposer, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// 20 Sample images with names
const PROJECTS = [
    { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=800&fit=crop', name: 'Abstract Art' },
    { url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=800&fit=crop', name: 'Digital Wave' },
    { url: 'https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&h=800&fit=crop', name: 'Neon Dreams' },
    { url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&h=800&fit=crop', name: 'Color Burst' },
    { url: 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=600&h=800&fit=crop', name: 'Gradient Flow' },
    { url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=800&fit=crop', name: 'Prism Light' },
    { url: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=800&fit=crop', name: 'Rainbow Sky' },
    { url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=600&h=800&fit=crop', name: 'Cosmic Glow' },
    { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop', name: 'Mountain Peak' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop', name: 'Ocean View' },
    { url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&h=800&fit=crop', name: 'City Lights' },
    { url: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=800&fit=crop', name: 'Desert Sand' },
    { url: 'https://images.unsplash.com/photo-1545987796-200677ee1011?w=600&h=800&fit=crop', name: 'Forest Path' },
    { url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=800&fit=crop', name: 'Sunset Glow' },
    { url: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=600&h=800&fit=crop', name: 'Aurora Night' },
    { url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&h=800&fit=crop', name: 'Crystal Clear' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop', name: 'Beach Waves' },
    { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop', name: 'Alpine View' },
    { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=800&fit=crop', name: 'Nature Path' },
    { url: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=600&h=800&fit=crop', name: 'Star Trail' },
];

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 uOffset;
  uniform vec2 uResolution;
  uniform vec3 uBorderColor;
  uniform vec3 uHoverColor;
  uniform vec3 uBackgroundColor;
  uniform vec2 uMousePos;
  uniform float uZoom;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform sampler2D uImageAtlas;
  uniform sampler2D uTextAtlas;
  
  varying vec2 vUv;
  
  void main() {
    vec2 screenUV = (vUv - 0.5) * 2.0;
    
    float radius = length(screenUV);
    float distortion = 1.0 - 0.08 * radius * radius;
    vec2 distortedUV = screenUV * distortion;
    
    float fade = 1.0 - smoothstep(1.2, 1.8, radius);
    
    float aspectRatio = uResolution.x / uResolution.y;
    vec2 worldCoord = distortedUV;
    worldCoord.x *= aspectRatio;
    
    worldCoord *= uZoom;
    worldCoord += uOffset;
    
    vec2 cellPos = worldCoord / uCellSize;
    vec2 cellId = floor(cellPos);
    vec2 cellUV = fract(cellPos);
    
    vec2 mouseScreenUV = (uMousePos / uResolution) * 2.0 - 1.0;
    mouseScreenUV.y = -mouseScreenUV.y;
    float mouseRadius = length(mouseScreenUV);
    float mouseDistortion = 1.0 - 0.08 * mouseRadius * mouseRadius;
    vec2 mouseDistortedUV = mouseScreenUV * mouseDistortion;
    
    vec2 mouseWorldCoord = mouseDistortedUV;
    mouseWorldCoord.x *= aspectRatio;
    mouseWorldCoord *= uZoom;
    mouseWorldCoord += uOffset;
    
    vec2 mouseCellPos = mouseWorldCoord / uCellSize;
    vec2 mouseCellId = floor(mouseCellPos);
    
    vec2 cellCenter = cellId + 0.5;
    vec2 mouseCellCenter = mouseCellId + 0.5;
    float cellDistance = length(cellCenter - mouseCellCenter);
    float hoverIntensity = 1.0 - smoothstep(0.0, 1.5, cellDistance);
    bool isHovered = hoverIntensity > 0.0 && uMousePos.x > 0.0;
    
    vec3 backgroundColor = uBackgroundColor;
    if (isHovered) {
      backgroundColor = mix(uBackgroundColor, uHoverColor, hoverIntensity * 0.3);
    }
    
    float imageBorder = 0.08;
    float imageSize = 1.0 - imageBorder * 2.0;
    vec2 imageUV = (cellUV - imageBorder) / imageSize;
    
    float smoothAmount = 0.01;
    vec2 imageMask = smoothstep(-smoothAmount, smoothAmount, imageUV) *
                     smoothstep(-smoothAmount, smoothAmount, 1.0 - imageUV);
    
    bool inImageArea = imageMask.x * imageMask.y > 0.5 && 
                       imageUV.x >= 0.0 && imageUV.x <= 1.0 && 
                       imageUV.y >= 0.65 && imageUV.y <= 1.0;
    
    vec3 color = backgroundColor;
    
    if (inImageArea) {
      // Better distribution: use prime number multiplication
      float textureIndex = mod(cellId.x * 7.0 + cellId.y * 13.0, uTextureCount);
      float atlasSize = ceil(sqrt(uTextureCount));
      
      vec2 atlasCoord = vec2(
        mod(textureIndex, atlasSize),
        floor(textureIndex / atlasSize)
      ) / atlasSize;
      
      vec2 adjustedImageUV = (imageUV - vec2(0.0, 0.65)) / 0.35;
      vec2 sampleUV = atlasCoord + adjustedImageUV / atlasSize;
      vec4 texColor = texture2D(uImageAtlas, sampleUV);
      
      color = mix(backgroundColor, texColor.rgb, texColor.a * imageMask.x * imageMask.y);
    }
    
    // Text area
    bool inTextArea = cellUV.x >= 0.08 && cellUV.x <= 0.92 && 
                      cellUV.y >= 0.08 && cellUV.y <= 0.6;
    
    if (inTextArea) {
      float textureIndex = mod(cellId.x * 7.0 + cellId.y * 13.0, uTextureCount);
      float atlasSize = ceil(sqrt(uTextureCount));
      
      vec2 atlasCoord = vec2(
        mod(textureIndex, atlasSize),
        floor(textureIndex / atlasSize)
      ) / atlasSize;
      
      vec2 textUV = (cellUV - vec2(0.08, 0.08)) / vec2(0.84, 0.52);
      vec2 sampleUV = atlasCoord + textUV / atlasSize;
      vec4 textColor = texture2D(uTextAtlas, sampleUV);
      
      if (textColor.a > 0.1) {
        color = mix(color, textColor.rgb, textColor.a);
      }
    }
    
    float gridThickness = 0.015;
    float gridMask = smoothstep(gridThickness, gridThickness + 0.01, cellUV.x) *
                     smoothstep(gridThickness, gridThickness + 0.01, cellUV.y) *
                     smoothstep(gridThickness, gridThickness + 0.01, 1.0 - cellUV.x) *
                     smoothstep(gridThickness, gridThickness + 0.01, 1.0 - cellUV.y);
    
    color = mix(uBorderColor, color, gridMask);
    
    gl_FragColor = vec4(color * fade, 1.0);
  }
`;

const GridShaderMaterial = shaderMaterial(
    {
        uOffset: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1),
        uBorderColor: new THREE.Color(0.08, 0.08, 0.08),
        uHoverColor: new THREE.Color(0.25, 0.25, 0.3),
        uBackgroundColor: new THREE.Color(0.03, 0.03, 0.03),
        uMousePos: new THREE.Vector2(-1, -1),
        uZoom: 1.0,
        uCellSize: 2.0,
        uTextureCount: 20,
        uImageAtlas: null,
        uTextAtlas: null,
    },
    vertexShader,
    fragmentShader
);

extend({ GridShaderMaterial });

function InfiniteShaderGrid({ onDragChange }) {
    const meshRef = useRef();
    const { viewport, size, gl } = useThree();
    const [mousePos, setMousePos] = useState(new THREE.Vector2(-1, -1));

    const textures = useTexture(PROJECTS.map(p => p.url));

    const { imageAtlas, textAtlas } = useMemo(() => {
        const atlasSize = Math.ceil(Math.sqrt(PROJECTS.length));
        const textureSize = 512;

        // Image Atlas
        const imageCanvas = document.createElement('canvas');
        imageCanvas.width = atlasSize * textureSize;
        imageCanvas.height = atlasSize * textureSize;
        const imageCtx = imageCanvas.getContext('2d');
        imageCtx.fillStyle = '#000';
        imageCtx.fillRect(0, 0, imageCanvas.width, imageCanvas.height);

        textures.forEach((texture, i) => {
            const col = i % atlasSize;
            const row = Math.floor(i / atlasSize);
            const x = col * textureSize;
            const y = row * textureSize;
            if (texture.image) {
                imageCtx.drawImage(texture.image, x, y, textureSize, textureSize);
            }
        });

        // Text Atlas
        const textCanvas = document.createElement('canvas');
        textCanvas.width = atlasSize * textureSize;
        textCanvas.height = atlasSize * textureSize;
        const textCtx = textCanvas.getContext('2d');
        textCtx.fillStyle = '#000';
        textCtx.fillRect(0, 0, textCanvas.width, textCanvas.height);

        PROJECTS.forEach((project, i) => {
            const col = i % atlasSize;
            const row = Math.floor(i / atlasSize);
            const x = col * textureSize;
            const y = row * textureSize;

            textCtx.fillStyle = '#ffffff';
            textCtx.font = 'bold 48px Arial';
            textCtx.textAlign = 'center';
            textCtx.textBaseline = 'middle';
            textCtx.fillText(project.name, x + textureSize / 2, y + textureSize / 2);
        });

        const imageAtlasTexture = new THREE.CanvasTexture(imageCanvas);
        imageAtlasTexture.needsUpdate = true;

        const textAtlasTexture = new THREE.CanvasTexture(textCanvas);
        textAtlasTexture.needsUpdate = true;

        return { imageAtlas: imageAtlasTexture, textAtlas: textAtlasTexture };
    }, [textures]);

    const scrollOffset = useRef(new THREE.Vector2(0, 0));
    const velocity = useRef(new THREE.Vector2(0, 0));
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
    const targetZoom = useRef(1.0);
    const currentZoom = useRef(1.0);

    useEffect(() => {
        const canvas = gl.domElement;

        const handleMouseMove = (e) => {
            setMousePos(new THREE.Vector2(e.clientX, e.clientY));
        };

        const handleMouseLeave = () => {
            setMousePos(new THREE.Vector2(-1, -1));
        };

        const handlePointerDown = (e) => {
            e.preventDefault();
            isDragging.current = true;
            targetZoom.current = 1.3;
            canvas.style.cursor = 'grabbing';
            onDragChange(true);

            const clientX = e.clientX || e.touches?.[0]?.clientX;
            const clientY = e.clientY || e.touches?.[0]?.clientY;

            dragStart.current = {
                x: clientX,
                y: clientY,
                offsetX: scrollOffset.current.x,
                offsetY: scrollOffset.current.y,
            };
        };

        const handlePointerMove = (e) => {
            if (!isDragging.current) {
                canvas.style.cursor = 'grab';
                return;
            }

            const clientX = e.clientX || e.touches?.[0]?.clientX;
            const clientY = e.clientY || e.touches?.[0]?.clientY;

            const dx = (clientX - dragStart.current.x) * 0.003;
            const dy = (clientY - dragStart.current.y) * 0.003;
            scrollOffset.current.x = dragStart.current.offsetX - dx;
            scrollOffset.current.y = dragStart.current.offsetY + dy;
        };

        const handlePointerUp = () => {
            isDragging.current = false;
            targetZoom.current = 1.0;
            canvas.style.cursor = 'grab';
            onDragChange(false);
        };

        canvas.style.cursor = 'grab';
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointermove', handlePointerMove);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerleave', handlePointerUp);
        canvas.addEventListener('touchstart', handlePointerDown);
        canvas.addEventListener('touchmove', handlePointerMove);
        canvas.addEventListener('touchend', handlePointerUp);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointermove', handlePointerMove);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerleave', handlePointerUp);
            canvas.removeEventListener('touchstart', handlePointerDown);
            canvas.removeEventListener('touchmove', handlePointerMove);
            canvas.removeEventListener('touchend', handlePointerUp);
        };
    }, [gl, onDragChange]);

    useFrame(() => {
        if (meshRef.current && imageAtlas && textAtlas) {
            if (!isDragging.current) {
                scrollOffset.current.x += velocity.current.x;
                scrollOffset.current.y += velocity.current.y;
                velocity.current.multiplyScalar(0.92);
            }

            currentZoom.current += (targetZoom.current - currentZoom.current) * 0.1;

            meshRef.current.material.uniforms.uOffset.value.copy(scrollOffset.current);
            meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
            meshRef.current.material.uniforms.uMousePos.value.copy(mousePos);
            meshRef.current.material.uniforms.uImageAtlas.value = imageAtlas;
            meshRef.current.material.uniforms.uTextAtlas.value = textAtlas;
            meshRef.current.material.uniforms.uTextureCount.value = PROJECTS.length;
            meshRef.current.material.uniforms.uZoom.value = currentZoom.current;
            meshRef.current.material.uniforms.uCellSize.value = 0.8;
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <gridShaderMaterial />
        </mesh>
    );
}

function Effects({ isDragging }) {
    return (
        <EffectComposer>
            <Vignette
                offset={0.35}
                darkness={0.6}
                eskil={false}
                blendFunction={BlendFunction.NORMAL}
            />
            {isDragging && (
                <ChromaticAberration
                    offset={[0.003, 0.003]}
                    radialModulation={true}
                    modulationOffset={0.5}
                />
            )}
        </EffectComposer>
    );
}

export default function ImageGallery() {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div style={{ width: '100vw', margin: 0, padding: 0, background: '#000' }}>
            {/* Gallery Section */}
            <div style={{ height: '100vh', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '2rem', pointerEvents: 'none' }}>
                        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ color: 'white' }}>
                                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>Projects</h1>
                                <p style={{ color: '#9ca3af', fontSize: '1.125rem', margin: 0 }}>Drag to explore</p>
                            </div>
                            <div style={{ color: 'white', textAlign: 'right', fontSize: '0.875rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '0.75rem' }}>
                                    <p style={{ color: '#9ca3af', marginBottom: '0.5rem', fontWeight: '600' }}>Effects</p>
                                    <p style={{ color: isDragging ? '#4ade80' : '#9ca3af', margin: '0.25rem 0' }}>
                                        {isDragging ? '◉ Chromatic Aberration' : '○ Vignette'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Canvas
                        style={{ width: '100%', height: '100%', display: 'block' }}
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        gl={{ antialias: true, alpha: false }}
                    >
                        <InfiniteShaderGrid onDragChange={setIsDragging} />
                        <Effects isDragging={isDragging} />
                    </Canvas>

                    <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, pointerEvents: 'none' }}>
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>↓ Scroll down for more content</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Next Section */}
            <div style={{ padding: '4rem 2rem', background: '#0a0a0a', color: 'white', minHeight: '60vh' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontWeight: 'bold' }}>About This Gallery</h2>
                    <p style={{ color: '#9ca3af', fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                        This is an infinite shader-based gallery with barrel distortion effects, texture atlas optimization,
                        and dynamic post-processing. Scroll down to explore more content.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left' }}>
                        <div style={{ padding: '1.5rem', background: '#111', borderRadius: '0.5rem', border: '1px solid #222' }}>
                            <h3 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>Shaders</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Custom GLSL for distortion & grid</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: '#111', borderRadius: '0.5rem', border: '1px solid #222' }}>
                            <h3 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>Atlas</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>20 images in 1 texture</p>
                        </div>
                        <div style={{ padding: '1.5rem', background: '#111', borderRadius: '0.5rem', border: '1px solid #222' }}>
                            <h3 style={{ color: '#4ade80', marginBottom: '0.5rem' }}>Effects</h3>
                            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Post-processing FX</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ padding: '3rem 2rem', background: '#000', color: 'white', borderTop: '1px solid #111' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '1rem' }}>Built with React Three Fiber + Custom Shaders</p>
                    <p style={{ color: '#444', fontSize: '0.875rem' }}>© 2024 Phantom Gallery Clone</p>
                </div>
            </footer>
        </div>
    );
}