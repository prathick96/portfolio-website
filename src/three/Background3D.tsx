import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer, Edges, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { sceneState } from './sceneState';

const damp = THREE.MathUtils.damp;

/* ----------------------------- Starfield ----------------------------- */

const starVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vColor = aColor;
    vTw = 0.4 + 0.6 * sin(uTime * 0.8 + aPhase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * uSize * (1.0 / max(-mv.z, 0.1));
    gl_Position = projectionMatrix * mv;
  }
`;

const starFragment = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vTw);
  }
`;

function buildStars(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const phases = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  const cool = new THREE.Color('#cdd6ff');
  const warm = new THREE.Color('#fff4e0');
  const gold = new THREE.Color('#e2c25c');
  const tmp = new THREE.Color();

  for (let i = 0; i < count; i++) {
    // random point on a spherical shell, biased outward
    const r = 22 + Math.pow(Math.random(), 0.6) * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    scales[i] = 0.5 + Math.pow(Math.random(), 2.2) * 2.6;
    phases[i] = Math.random() * Math.PI * 2;

    const pick = Math.random();
    tmp.copy(pick < 0.15 ? gold : pick < 0.55 ? warm : cool);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSize: { value: 26 } },
    vertexShader: starVertex,
    fragmentShader: starFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { geometry, material };
}

function Starfield({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { geometry, material } = useMemo(() => buildStars(count), [count]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    if (animate) material.uniforms.uTime.value += d;
    const g = group.current;
    if (!g) return;
    g.rotation.y += d * 0.01;
    // gentle parallax toward the pointer + drift with scroll
    g.rotation.x = damp(g.rotation.x, sceneState.pointerY * 0.06 + sceneState.scroll * 0.4, 3, d);
    g.position.x = damp(g.position.x, sceneState.pointerX * 0.6, 3, d);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

/* ----------------------------- Gold dust ----------------------------- */

function buildDust(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 1.6 + Math.random() * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 6;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: new THREE.Color('#f0c860'),
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { geometry, material };
}

function GoldDust({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { geometry, material } = useMemo(() => buildDust(count), [count]);
  useFrame((_, dt) => {
    if (!animate || !group.current) return;
    group.current.rotation.y += Math.min(dt, 0.05) * 0.06;
  });
  return (
    <group ref={group}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

/* --------------------------- Glass crystal --------------------------- */

function Crystal({ lowPower, animate }: { lowPower: boolean; animate: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    if (animate) {
      g.rotation.y = damp(g.rotation.y, sceneState.pointerX * 0.5, 2.5, d);
      g.rotation.x = damp(g.rotation.x, sceneState.pointerY * 0.3, 2.5, d);
    }
    // lift + shrink slightly as the page scrolls
    g.position.y = damp(g.position.y, sceneState.scroll * 2.2, 3, d);
    const s = 1 - sceneState.scroll * 0.25;
    g.scale.setScalar(damp(g.scale.x, s, 3, d));
  });

  const mesh = (
    <mesh>
      <icosahedronGeometry args={[1.45, 0]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.65}
        roughness={0.12}
        ior={1.5}
        chromaticAberration={0.55}
        anisotropicBlur={0.4}
        distortion={0.35}
        distortionScale={0.4}
        temporalDistortion={animate ? 0.12 : 0}
        color="#fff6df"
        attenuationColor="#f0c75e"
        attenuationDistance={1.4}
        backside={!lowPower}
        resolution={lowPower ? 256 : 512}
        samples={lowPower ? 4 : 8}
      />
      <Edges scale={1.001} threshold={12} color="#e8c36b" />
    </mesh>
  );

  return (
    <group ref={group}>
      {animate ? (
        <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1.0}>
          {mesh}
        </Float>
      ) : (
        mesh
      )}
    </group>
  );
}

/* ------------------------------ Effects ------------------------------ */

function Effects({ lowPower }: { lowPower: boolean }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), []);
  return (
    <EffectComposer multisampling={lowPower ? 0 : 4} enableNormalPass={false}>
      <Bloom
        mipmapBlur
        intensity={lowPower ? 0.5 : 0.85}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.22}
      />
      {!lowPower ? (
        <ChromaticAberration offset={caOffset} radialModulation modulationOffset={0.4} />
      ) : (
        <></>
      )}
      <Vignette offset={0.22} darkness={0.78} />
    </EffectComposer>
  );
}

/* ------------------------------- Scene ------------------------------- */

function Scene({ lowPower, animate }: { lowPower: boolean; animate: boolean }) {
  return (
    <>
      <color attach="background" args={['#050509']} />
      <fog attach="fog" args={['#050509', 14, 38]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.2} color="#fff3d6" />
      <pointLight position={[-4, -2, 3]} intensity={26} distance={20} color="#ca8a04" />

      <Starfield count={lowPower ? 1800 : 4200} animate={animate} />
      <GoldDust count={lowPower ? 60 : 130} animate={animate} />
      <Crystal lowPower={lowPower} animate={animate} />

      <Environment resolution={256} frames={1}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="circle" intensity={4} position={[0, 5, -9]} scale={7} color="#fff3d6" />
          <Lightformer form="ring" intensity={3} position={[-5, 1, -6]} scale={4} color="#e2c25c" />
          <Lightformer form="rect" intensity={2} position={[5, -3, -5]} scale={[10, 2, 1]} color="#6f8bff" />
        </group>
      </Environment>

      <Effects lowPower={lowPower} />
    </>
  );
}

export interface Background3DProps {
  reducedMotion?: boolean;
  lowPower?: boolean;
}

export default function Background3D({ reducedMotion = false, lowPower = false }: Background3DProps) {
  const animate = !reducedMotion;
  return (
    <Canvas
      className="!fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
      dpr={[1, lowPower ? 1.3 : 2]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7], fov: 42 }}
      frameloop={animate ? 'always' : 'demand'}
    >
      <Suspense fallback={null}>
        <Scene lowPower={lowPower} animate={animate} />
      </Suspense>
    </Canvas>
  );
}
