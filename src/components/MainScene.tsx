// src/components/MainScene.tsx
import React from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Html} from "@react-three/drei";
import {useNavigate} from "react-router-dom";

const MainScene: React.FC = () => {
  const navigate = useNavigate();

  const handleRoomClick = (roomNumber: number) => {
    navigate(`/room${roomNumber}`);
  };

  return (
    <Canvas>
      <ambientLight />
      <OrbitControls />
      {/* 룸으로 진입할 수 있는 3D 오브젝트 */}
      <mesh position={[-2, 0, 0]} onClick={() => handleRoomClick(1)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
        <Html distanceFactor={10}>
          <div className="text-white">Room 1</div>
        </Html>
      </mesh>
      {/* 다른 룸들도 동일하게 추가 */}
    </Canvas>
  );
};

export default MainScene;
