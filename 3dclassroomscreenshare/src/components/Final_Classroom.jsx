import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useState } from 'react';


export function Final_Classroom({ frame, props }) {
  const { nodes, materials } = useGLTF('/models/Classroom_Updated[1].glb')
  // Determine the texture path first, then use it unconditionally
  const texturePath = frame || '/images/car.jpg';
  const boardTexture = useTexture(texturePath);
  boardTexture.flipY = false;





  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.052}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[53.361, 0, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low001|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[53.361, 80.79, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low002|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[134.006, 0, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low003|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[134.006, 80.79, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low004|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[-27.373, 0, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['casiers_low005|casiers_L_casiersblend|Dupli|_casiers_0'].geometry}
            material={materials.casiers}
            position={[-27.373, 80.79, -484.441]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[278.423, -1.155, -343.326]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair001|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[278.423, -1.155, -206.226]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair002|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[278.423, -1.155, -69.548]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair003|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[278.423, -1.155, 67.129]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair004|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[278.423, -1.155, 203.806]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair005|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[110.782, -1.155, -343.326]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair006|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[110.782, -1.155, -206.226]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair007|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[110.782, -1.155, -69.548]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair008|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[110.782, -1.155, 67.129]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair009|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[110.782, -1.155, 203.806]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair010|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-84.64, -1.155, -343.326]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair011|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-84.64, -1.155, -206.226]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair012|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-84.64, -1.155, -69.548]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair013|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-84.64, -1.155, 67.129]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair014|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-84.64, -1.155, 203.806]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair015|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-266.199, -1.155, -343.326]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair016|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-266.199, -1.155, -206.226]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair017|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-266.199, -1.155, -69.548]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair018|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-266.199, -1.155, 67.129]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['chair019|chair_L_chairblend|Dupli|_chair_0'].geometry}
            material={materials.chair}
            position={[-266.199, -1.155, 203.806]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['clock001|clock_L_clockblend|Dupli|_clock_0'].geometry}
            material={materials.clock}
            position={[-31.238, 277.219, 501.525]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <group position={[-409.445, 0, 331.813]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Door001|Door_L_doorblend|Dupli|_door_0'].geometry}
              material={materials.door}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Door001|handle_L_doorblend|Dupli|1_Chrome_0'].geometry}
              material={materials.Chrome}
              position={[0.142, -0.366, 1.097]}
            />
          </group>
          <group position={[-236.254, 0.215, -492.55]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['etagere001|etagere001_L_etagereblend|Dupli|1_etagere_0'].geometry}
              material={materials.etagere}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['etagere001|etagere_L_etagereblend|Dupli|_etagere_0'].geometry}
              material={materials.etagere}
            />
          </group>
          <group position={[281.173, 0.479, -501.295]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['GrandCasier001|GrandCasier_L_GrandCasierblend|Dupli|_GrandCas'].geometry
              }
              material={materials.GrandCasier}
              scale={0.5}
            />
          </group>
          <group
            position={[-157.927, 340.215, -259.786]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['neon|neon_L_neonblend|Dupli|_neon_0'].geometry}
              material={materials.neon}
              position={[0, -0.642, -0.08]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.047}
            />
          </group>
          <group
            position={[154.089, 340.215, -259.786]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['neon001|neon_L_neonblend|Dupli|_neon_0'].geometry}
              material={materials.neon}
              position={[0, -0.642, -0.08]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.047}
            />
          </group>
          <group
            position={[-157.927, 340.215, 247.976]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['neon002|neon_L_neonblend|Dupli|_neon_0'].geometry}
              material={materials.neon}
              position={[0, -0.642, -0.08]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.047}
            />
          </group>
          <group position={[154.089, 340.215, 247.976]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['neon003|neon_L_neonblend|Dupli|_neon_0'].geometry}
              material={materials.neon}
              position={[0, -0.642, -0.08]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.047}
            />
          </group>
          <group
            position={[-401.973, 130.348, -244.859]}
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['porteManteau|porteManteau001_L_porteManteaublend|Dupli|2_Chro'].geometry
              }
              material={materials.Chrome_0}
              position={[-3.872, -0.045, 0.027]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['porteManteau|porteManteau002_L_porteManteaublend|Dupli|1_Chro'].geometry
              }
              material={materials.Chrome_0}
              position={[-1.792, -0.045, 0.027]}
              rotation={[0, 0, -Math.PI / 2]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['porteManteau|porteManteau_L_porteManteaublend|Dupli|_PlasticBl'].geometry
              }
              material={materials.PlasticBlack}
            />
          </group>
          <group position={[377.215, 44.441, -299.108]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['radiateur|radiateur001_L_radiateurblend|Dupli|_radiateur_0'].geometry
              }
              material={materials.radiateur}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['radiateur|radiateur_L_radiateurblend|Dupli|1_radiateur_0'].geometry}
              material={materials.radiateur}
            />
          </group>
          <group position={[377.215, 44.441, 314.355]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['radiateur001|radiateur001_L_radiateurblend|Dupli|_radiateur_'].geometry
              }
              material={materials.radiateur}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['radiateur001|radiateur_L_radiateurblend|Dupli|1_radiateur_0'].geometry
              }
              material={materials.radiateur}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes['teacherDesk001|teacherDesk_L_teacherDeskblend|Dupli|_teacherD'].geometry
            }
            material={materials.teacherDesk}
            position={[2.438, -0.381, 343.395]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={100}
          />
          <group
            position={[393.244, 93.868, -239.339]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window002|Glass_L_Windowblend|Dupli|2_glass_0'].geometry}
              material={materials.glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window002|Plane_L_Windowblend|Dupli|4_Rideau_0'].geometry}
              material={materials.Rideau}
              position={[0.019, 1.129, 1.127]}
              rotation={[0, 1.571, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window002|Wall_L_Windowblend|Dupli|_wallConcrete_0'].geometry}
              material={materials.wallConcrete_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window002|Window_L_Windowblend|Dupli|1_PlasticGrey_0'].geometry}
              material={materials.PlasticGrey}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Window002|WindowWoodPlate_L_Windowblend|Dupli|3_WindowWoodPla'].geometry
              }
              material={materials.WindowWoodPlate}
              position={[-0.118, 0.862, -0.761]}
            />
          </group>
          <group
            position={[393.244, 93.868, 237.28]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={100}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window003|Glass_L_Windowblend|Dupli|2_glass_0'].geometry}
              material={materials.glass}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window003|Plane_L_Windowblend|Dupli|4_Rideau_0'].geometry}
              material={materials.Rideau}
              position={[0.019, 1.129, 1.127]}
              rotation={[0, 1.571, 0]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window003|Wall_L_Windowblend|Dupli|_wallConcrete_0'].geometry}
              material={materials.wallConcrete_0}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Window003|Window_L_Windowblend|Dupli|1_PlasticGrey_0'].geometry}
              material={materials.PlasticGrey}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={
                nodes['Window003|WindowWoodPlate_L_Windowblend|Dupli|3_WindowWoodPla'].geometry
              }
              material={materials.WindowWoodPlate}
              position={[-0.118, 0.862, -0.761]}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ceilling_ceilling_0.geometry}
            material={materials.ceilling}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_Desk_0.geometry}
            material={materials.Desk}
            position={[290.976, 0, -330.936]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_godray_0.geometry}
            material={materials.godray}
            position={[394.049, 165.486, -66.482]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_godray_0.geometry}
            material={materials.godray}
            position={[394.049, 165.486, 207.168]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_godray_0.geometry}
            material={materials.godray}
            position={[394.049, 165.486, -284.83]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_godray_0.geometry}
            material={materials.godray}
            position={[394.049, 165.486, 415.28]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.ground_ground_0.geometry}
            material={materials.ground}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.wall_wallConcrete_0.geometry}
            material={materials.wallConcrete}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.wall001_wallConcrete_0.geometry}
            material={materials.wallConcrete}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.wall002_wallConcrete_0.geometry}
            material={materials.wallConcrete}
            position={[0, 0, -475.959]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.wall004_wallConcrete_0.geometry}
            material={materials.wallConcrete}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
      <group position={[-2.158, 1.279, 25.981]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={2.775}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_1.geometry}

        >
          <meshStandardMaterial map={boardTexture} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane_2.geometry}
          material={materials['Wood.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/Classroom_Updated[1].glb')