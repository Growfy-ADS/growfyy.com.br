import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Line, MeshDistortMaterial, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

const bars = [.42, .7, 1.05, 1.48]

function MarketingData() {
  const network = useRef<Group>(null)

  useFrame((_, delta) => {
    if (network.current) network.current.rotation.z -= delta * .08
  })

  return <group>
    <Float speed={1.4} rotationIntensity={.12} floatIntensity={.35}>
      <group position={[1.55, -.8, -.35]} rotation={[.1, -.35, 0]}>
        {bars.map((height, index) => <mesh key={height} position={[index * .3, height / 2, 0]}>
          <boxGeometry args={[.19, height, .19]} />
          <meshStandardMaterial color={index < 2 ? '#ADEC00' : '#009D4E'} metalness={.45} roughness={.3}/>
        </mesh>)}
        <Line points={[[0,.5,.12],[.3,.82,.12],[.6,1.14,.12],[.9,1.62,.12]]} color="#e8ff9a" lineWidth={1.5}/>
      </group>
    </Float>
    <group ref={network} position={[-1.65, -.05, -.8]}>
      <mesh><torusGeometry args={[.72,.012,8,64]}/><meshBasicMaterial color="#22b94d" transparent opacity={.55}/></mesh>
      {[[0,.72],[-.68,-.22],[.57,-.44]].map(([x,y],index)=><mesh key={index} position={[x,y,0]} scale={index === 0 ? .13 : .09}>
        <icosahedronGeometry args={[1,1]}/><meshStandardMaterial color={index === 0 ? '#ADEC00' : '#16A344'} emissive="#16A344" emissiveIntensity={.45}/>
      </mesh>)}
      <Line points={[[0,.72,0],[-.68,-.22,0],[.57,-.44,0],[0,.72,0]]} color="#37c957" transparent opacity={.5} lineWidth={1}/>
    </group>
  </group>
}

function GrowthObject({ light }: { light: boolean }) {
  const core = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!core.current) return
    core.current.rotation.y += delta * 0.2
    core.current.rotation.x = state.pointer.y * 0.12
    core.current.rotation.z = -state.pointer.x * 0.08
  })

  return <group ref={core}>
    <Float speed={2.2} rotationIntensity={0.45} floatIntensity={0.7}>
      <mesh scale={1.05}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color={light ? '#dff3dc' : '#0b2415'}
          emissive="#16A344"
          emissiveIntensity={light ? .08 : .22}
          roughness={.5}
          metalness={.25}
          distort={.08}
          speed={1}
          wireframe
        />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, .2, 0]}><torusGeometry args={[1.34,.025,10,100]}/><meshStandardMaterial color="#ADEC00" emissive="#62B900" emissiveIntensity={.65}/></mesh>
      <mesh rotation={[.25, Math.PI / 2.1, 0]}><torusGeometry args={[1.2,.014,8,100]}/><meshBasicMaterial color="#009D4E" transparent opacity={.75}/></mesh>
      <group position={[0,0,1.12]} rotation={[0,0,-.12]}>
        <mesh position={[-.36,-.28,0]}><boxGeometry args={[.16,.38,.12]}/><meshStandardMaterial color="#54C92A"/></mesh>
        <mesh position={[-.1,-.14,0]}><boxGeometry args={[.16,.66,.12]}/><meshStandardMaterial color="#35BD3E"/></mesh>
        <mesh position={[.16,.04,0]}><boxGeometry args={[.16,1.02,.12]}/><meshStandardMaterial color="#16A344"/></mesh>
        <Line points={[[-.48,.12,.08],[-.15,.28,.08],[.18,.65,.08],[.43,.92,.08]]} color="#efffb8" lineWidth={2}/>
      </group>
    </Float>
    <mesh position={[-1.85, 1.3, -.8]} scale={.18}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ADEC00" emissive="#62B900" emissiveIntensity={.7}/>
    </mesh>
    <mesh position={[1.65, -1.25, .1]} scale={.12}>
      <octahedronGeometry />
      <meshStandardMaterial color="#20B953" emissive="#009D4E" emissiveIntensity={.7}/>
    </mesh>
  </group>
}

export default function GrowthScene({ light }: { light: boolean }) {
  return <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={light ? 1.6 : .7} />
    <directionalLight position={[4, 5, 4]} intensity={light ? 3 : 2.2} color="#f5ffd8" />
    <pointLight position={[-4, -2, 3]} intensity={2.5} color="#0ee674" />
    <GrowthObject light={light}/>
    <MarketingData/>
    <Sparkles count={35} scale={5} size={1.7} speed={.35} color={light ? '#009D4E' : '#ADEC00'} opacity={.6}/>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.45}/>
  </Canvas>
}
