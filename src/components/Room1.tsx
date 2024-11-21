// src/components/Room1.tsx
import React, {useRef} from "react";
import {Canvas, useFrame, extend} from "@react-three/fiber";
import {shaderMaterial} from "@react-three/drei";
import {TextureLoader} from "three";
import * as THREE from "three";
import {useLoader} from "@react-three/fiber";
import {motion} from "framer-motion";

const ImageShaderMaterial = shaderMaterial(
  {time: 0, hover: 0, texture: null},
  // vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  // fragment shader
  `
  uniform float time;
  uniform float hover;
  uniform sampler2D texture;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    uv.y += sin(uv.x * 10.0 + time) * 0.1 * hover;
    gl_FragColor = texture2D(texture, uv);
  }
  `
);

extend({ImageShaderMaterial});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageShaderMaterial: any;
    }
  }
}

const ImagePlane: React.FC = () => {
  const shaderRef = useRef<any>();
  const texture = useLoader(TextureLoader, "https://source.unsplash.com/random/800x600");

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.time += delta;
    }
  });

  return (
    <mesh
      onPointerOver={() => (shaderRef.current.hover = 1)}
      onPointerOut={() => (shaderRef.current.hover = 0)}
    >
      <planeGeometry args={[5, 3]} />
      <imageShaderMaterial ref={shaderRef} texture={texture} />
    </mesh>
  );
};

const Room1Scene: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <ImagePlane />
    </Canvas>
  );
};

export default Room1Scene;
