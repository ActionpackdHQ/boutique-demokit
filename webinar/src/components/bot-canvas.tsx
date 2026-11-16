"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useRef, type ReactNode } from "react";
import type { Group } from "three";

class SceneBoundary extends Component<{ children: ReactNode }, { down: boolean }> {
  state = { down: false };

  static getDerivedStateFromError() {
    return { down: true };
  }

  render() {
    return this.state.down ? null : this.props.children;
  }
}

function BotHead() {
  const ref = useRef<Group>(null);
  const ring = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.32;
      ref.current.rotation.x = Math.sin(t * 0.45) * 0.08;
      ref.current.position.y = Math.sin(t * 0.85) * 0.07;
    }
    if (ring.current) {
      ring.current.rotation.z = t * 0.18;
      ring.current.rotation.x = 1.15;
    }
  });

  return (
    <group>
      <group ref={ring}>
        <mesh>
          <torusGeometry args={[1.62, 0.008, 12, 90]} />
          <meshBasicMaterial color="#e7c7a4" transparent opacity={0.55} />
        </mesh>
      </group>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color="#16181e"
            metalness={0.94}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[0.28, 0.36, 0.28, 24]} />
          <meshStandardMaterial color="#0c0d11" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.34, 12]} />
          <meshStandardMaterial color="#c9b39a" metalness={0.7} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.24, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#fff4e4" emissive="#ffe3bf" emissiveIntensity={3} />
        </mesh>
        <mesh position={[0, 0.08, 0.78]}>
          <boxGeometry args={[0.92, 0.16, 0.18]} />
          <meshStandardMaterial color="#07080b" metalness={1} roughness={0.18} />
        </mesh>
        <mesh position={[-0.28, 0.1, 0.9]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#fff8ee" emissive="#fff1d4" emissiveIntensity={2.4} />
        </mesh>
        <mesh position={[0.28, 0.1, 0.9]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#fff8ee" emissive="#fff1d4" emissiveIntensity={2.4} />
        </mesh>
        <mesh position={[0, -0.28, 0.9]}>
          <boxGeometry args={[0.34, 0.035, 0.04]} />
          <meshStandardMaterial color="#efe2d2" emissive="#d9c2a4" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function BotCanvas({ onReady }: { onReady?: () => void }) {
  return (
    <SceneBoundary>
      <Canvas
        className="bot-canvas"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.15, 4.25], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <ambientLight intensity={0.05} />
        <spotLight
          position={[1.2, 4.4, 3.4]}
          angle={0.34}
          penumbra={1}
          intensity={36}
          color="#fff4e6"
        />
        <directionalLight position={[-3.2, 0.4, -1.4]} intensity={0.7} color="#7f93b8" />
        <BotHead />
      </Canvas>
    </SceneBoundary>
  );
}
