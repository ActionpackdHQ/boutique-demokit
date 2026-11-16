"use client";

import { RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useMemo, useRef, type ReactNode } from "react";
import type { Group, Mesh } from "three";
import { MathUtils } from "three";

class SceneBoundary extends Component<{ children: ReactNode }, { down: boolean }> {
  state = { down: false };

  static getDerivedStateFromError() {
    return { down: true };
  }

  render() {
    return this.state.down ? null : this.props.children;
  }
}

type Bubble = {
  angle: number;
  radius: number;
  lift: number;
  size: [number, number, number];
  color: string;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
};

const BUBBLES: Bubble[] = [
  { angle: 0.2, radius: 1.85, lift: 0.45, size: [0.62, 0.38, 0.16], color: "#6d4aff", ox: 0, oy: 0, vx: 0, vy: 0 },
  { angle: 1.5, radius: 2.05, lift: -0.15, size: [0.5, 0.32, 0.14], color: "#3ec6ff", ox: 0, oy: 0, vx: 0, vy: 0 },
  { angle: 2.7, radius: 1.7, lift: 0.7, size: [0.44, 0.28, 0.12], color: "#ff6b9a", ox: 0, oy: 0, vx: 0, vy: 0 },
  { angle: 4.1, radius: 2.15, lift: -0.55, size: [0.56, 0.34, 0.14], color: "#ffffff", ox: 0, oy: 0, vx: 0, vy: 0 },
  { angle: 5.2, radius: 1.55, lift: 0.15, size: [0.36, 0.24, 0.12], color: "#8b78ff", ox: 0, oy: 0, vx: 0, vy: 0 },
];

function Scene({ mode }: { mode: "pointer" | "touch" }) {
  const head = useRef<Group>(null);
  const eyes = useRef<Group>(null);
  const smile = useRef<Mesh>(null);
  const bubbles = useRef<Group>(null);
  const specs = useMemo(() => BUBBLES.map((bubble) => ({ ...bubble })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cta = document.documentElement.dataset.ctaHover === "1";
    const auto = mode === "touch";
    const px = auto ? Math.sin(t * 0.55) * 0.85 : state.pointer.x;
    const py = auto ? Math.cos(t * 0.4) * 0.35 : state.pointer.y;
    const near = Math.min(1, Math.hypot(px, py * 1.2) < 0.72 || cta ? 1 : Math.max(0, 1 - Math.hypot(px, py) / 1.35));

    if (head.current) {
      const tilt = window.scrollY * 0.0004;
      head.current.rotation.y = MathUtils.lerp(head.current.rotation.y, px * 0.7, 0.08);
      head.current.rotation.x = MathUtils.lerp(head.current.rotation.x, -py * 0.45 + tilt, 0.08);
      head.current.position.y = Math.sin(t * 1.3) * 0.06;
    }
    if (eyes.current) {
      eyes.current.rotation.y = MathUtils.lerp(eyes.current.rotation.y, px * 0.45, 0.14);
      eyes.current.rotation.x = MathUtils.lerp(eyes.current.rotation.x, -py * 0.28, 0.14);
      const phase = t % 3.8;
      const blink =
        phase < 0.08 ? Math.max(0.08, 1 - phase / 0.08) : phase < 0.16 ? Math.min(1, (phase - 0.08) / 0.08) : 1;
      eyes.current.scale.y = blink * (1 + near * 0.08);
    }
    if (smile.current) {
      const open = 0.9 + near * 0.85;
      smile.current.scale.x = MathUtils.lerp(smile.current.scale.x, open, 0.1);
      smile.current.scale.y = MathUtils.lerp(smile.current.scale.y, 0.75 + near * 0.55, 0.1);
    }
    if (!bubbles.current) return;
    bubbles.current.children.forEach((child, index) => {
      const spec = specs[index];
      if (!spec) return;
      const scroll = window.scrollY * 0.00035;
      const baseX = Math.cos(spec.angle + t * 0.22 + scroll) * spec.radius;
      const baseY = spec.lift + Math.sin(t * 0.8 + index) * 0.12;
      const baseZ = Math.sin(spec.angle + t * 0.22 + scroll) * 0.55;
      const dx = baseX + spec.ox - px * 2.1;
      const dy = baseY + spec.oy - py * 1.3;
      const dist = Math.hypot(dx, dy) || 0.001;
      if (dist < 1.15) {
        const push = (1.15 - dist) * 0.18;
        spec.vx += (dx / dist) * push;
        spec.vy += (dy / dist) * push;
      }
      spec.vx += -spec.ox * 0.04;
      spec.vy += -spec.oy * 0.04;
      spec.vx *= 0.86;
      spec.vy *= 0.86;
      spec.ox += spec.vx;
      spec.oy += spec.vy;
      child.position.set(baseX + spec.ox, baseY + spec.oy, baseZ);
      child.lookAt(0, 0.1, 0);
    });
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <spotLight position={[2.4, 4.2, 3.2]} angle={0.5} penumbra={0.8} intensity={28} color="#fff8ff" />
      <directionalLight position={[-2.5, 1.4, 2]} intensity={1.3} color="#d9e6ff" />
      <pointLight position={[1.6, 0.2, 1.8]} intensity={8} color="#6d4aff" />
      <group ref={head}>
        <RoundedBox args={[1.42, 1.22, 1.16]} radius={0.42} smoothness={4}>
          <meshPhysicalMaterial color="#f6f4ff" roughness={0.22} metalness={0.08} clearcoat={1} clearcoatRoughness={0.12} />
        </RoundedBox>
        <RoundedBox args={[0.28, 0.42, 0.22]} radius={0.1} smoothness={3} position={[-0.78, 0.08, 0]}>
          <meshStandardMaterial color="#6d4aff" roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.28, 0.42, 0.22]} radius={0.1} smoothness={3} position={[0.78, 0.08, 0]}>
          <meshStandardMaterial color="#6d4aff" roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[0.92, 0.34, 0.12]} radius={0.1} smoothness={3} position={[0, 0.08, 0.56]}>
          <meshStandardMaterial color="#221a40" metalness={0.4} roughness={0.25} />
        </RoundedBox>
        <group ref={eyes} position={[0, 0.1, 0.62]}>
          <mesh position={[-0.24, 0, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.24, 0, 0]}>
            <sphereGeometry args={[0.1, 20, 20]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.24, 0, 0.07]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#5b3dff" emissive="#6d4aff" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.24, 0, 0.07]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#5b3dff" emissive="#6d4aff" emissiveIntensity={0.6} />
          </mesh>
        </group>
        <mesh ref={smile} position={[0, -0.28, 0.58]} rotation={[0.15, 0, Math.PI]}>
          <torusGeometry args={[0.2, 0.028, 8, 18, Math.PI]} />
          <meshStandardMaterial color="#241b45" />
        </mesh>
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.28, 12]} />
          <meshStandardMaterial color="#6d4aff" />
        </mesh>
        <mesh position={[0, 0.96, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#3ec6ff" emissive="#3ec6ff" emissiveIntensity={1.4} />
        </mesh>
      </group>
      <group ref={bubbles}>
        {specs.map((spec) => (
          <group key={spec.angle}>
            <RoundedBox args={spec.size} radius={0.12} smoothness={3}>
              <meshPhysicalMaterial color={spec.color} roughness={0.18} metalness={0.05} clearcoat={0.8} transparent opacity={0.94} />
            </RoundedBox>
          </group>
        ))}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]}>
        <circleGeometry args={[0.85, 32]} />
        <meshBasicMaterial color="#6d4aff" transparent opacity={0.12} />
      </mesh>
    </>
  );
}

export default function BotCanvas({
  onReady,
  mode = "pointer",
}: {
  onReady?: () => void;
  mode?: "pointer" | "touch";
}) {
  return (
    <SceneBoundary>
      <Canvas
        className="bot-canvas"
        dpr={mode === "touch" ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0.15, 4.4], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          onReady?.();
        }}
      >
        <Scene mode={mode} />
      </Canvas>
    </SceneBoundary>
  );
}
