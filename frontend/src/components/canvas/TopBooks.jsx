"use client";

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Text,
  Image,
} from "@react-three/drei";
import { easing, geometry } from "maath";

extend(geometry);

function Frame({
  id,
  name,
  author,
  bg,
  width = 1,
  height = 1.61803398875,
  children,
  ...props
}) {
  const portal = useRef();
  const [hovered, hover] = useState(false);

  useCursor(hovered);
  useFrame((state, dt) => {
    easing.damp(portal.current, "blend", 0, 0.2, dt);
  });

  return (
    <group {...props}>
      <Text
        fontSize={0.12}
        maxWidth={0.8}
        anchorY="top"
        anchorX="top"
        lineHeight={1.5}
        position={[-0.4, 0.715, 0.01]}
        material-toneMapped={false}
      >
        {name}
      </Text>
      <Text
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.6, 0.01]}
        material-toneMapped={false}
      >
        /{id}
      </Text>
      <Text
        fontSize={0.08}
        anchorX="left"
        position={[-0.4, -0.6, 0.01]}
        material-toneMapped={false}
      >
        {author}
      </Text>
      <mesh
        name={id}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial ref={portal} side={THREE.DoubleSide} transparent>
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

function Rig({
  position = new THREE.Vector3(0, 0, 1.5),
  focus = new THREE.Vector3(0, 0, 0),
}) {
  const { controls } = useThree();

  useEffect(() => {
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  });

  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
}

export default function TopBooksCanvas({ data }) {
  return (
    <Canvas
      camera={{ fov: 75, position: [0, 0, 20] }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
      style={{
        width: "100%",
        height: 600,
      }}
    >
      {data.map((item, i) => {
        const props = {
          id: "02",
          name: item.title,
          author: item.author,
        };

        if (i === 0) {
          props.id = "01";
          props.position = [-1.15, 0, 0];
          props.rotation = [0, 0.5, 0];
        } else if (i === 2) {
          props.id = "03";
          props.position = [1.15, 0, 0];
          props.rotation = [0, -0.5, 0];
        }

        return (
          <Frame key={i} {...props}>
            <Image
              scale={[2, 2, 0]}
              raycast={() => null}
              position={[0, 0, -0.1]}
              url={item.imageUrl}
            />
          </Frame>
        );
      })}

      <Rig />
    </Canvas>
  );
}
