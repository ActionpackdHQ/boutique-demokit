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
          <torusGeometry args={[1.62, 0.012, 12, 90]} />
          <meshStandardMaterial color="#c9a24a" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>
      <group ref={ref}>
        <mesh>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial
            color="#f7f4ee"
            metalness={0.25}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.06}
          />
        </mesh>
        <mesh position={[0, -1.05, 0]}>
          <cylinderGeometry args={[0.28, 0.36, 0.28, 24]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.28} />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.34, 12]} />
          <meshStandardMaterial color="#c9a24a" metalness={0.75} roughness={0.22} />
        </mesh>
        <mesh position={[0, 1.24, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#c8102e" emissive="#c8102e" emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0, 0.08, 0.78]}>
          <boxGeometry args={[0.92, 0.16, 0.18]} />
          <meshStandardMaterial color="#c8102e" metalness={0.6} roughness={0.22} />
        </mesh>
        <mesh position={[-0.28, 0.1, 0.9]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#c8102e" emissive="#c8102e" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0.28, 0.1, 0.9]}>
          <sphereGeometry args={[0.075, 20, 20]} />
          <meshStandardMaterial color="#c8102e" emissive="#c8102e" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0, -0.28, 0.9]}>
          <boxGeometry args={[0.34, 0.035, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.35} />
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
        <ambientLight intensity={0.72} />
        <spotLight
          position={[1.4, 4.6, 3.6]}
          angle={0.4}
          penumbra={0.85}
          intensity={48}
          color="#fffaf4"
        />
        <directionalLight position={[-3.2, 1.2, 2]} intensity={1.4} color="#ffffff" />
        <pointLight position={[2.2, -0.4, 2.4]} intensity={6} color="#c8102e" />
        <BotHead />
      </Canvas>
    </SceneBoundary>
  );
}
