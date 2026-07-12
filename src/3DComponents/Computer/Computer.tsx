import React, { Suspense } from 'react'
import { ContactShadows, Float, Html, TransformControls, useGLTF } from '@react-three/drei';
import { button, useControls } from 'leva';

type Props = {
  iframe?: string | null
}

const Computer = ({ iframe }: Props) => {
  const computer = useGLTF(
    "/models/macbook.glb"
  );

  const {
    modelRotX,
    modelRotY,
    modelRotZ,
    modelPosX,
    modelPosY,
    modelPosZ,
    modelScale,
    screenPosX,
    screenPosY,
    screenPosZ,
    screenRotX,
    screenRotY,
    screenRotZ,
    screenDistance,
    previewLength,
    previewBreadth,
    iframeWidth,
    iframeHeight,
    scaleX,
    scaleY,
    cssRotateX,
    skewX,
    skewY,
    cssPerspective,
    enableGizmo,
    gizmoMode,
  } = useControls("MacBook & Screen Alignment", {
    modelRotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.02, label: "1. Laptop Pitch (X)" },
    modelRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.02, label: "1. Laptop Yaw (Y)" },
    modelRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.02, label: "1. Laptop Roll (Z)" },
    modelPosX: { value: 0, min: -3, max: 3, step: 0.05, label: "1. Laptop Move X" },
    modelPosY: { value: -1.2, min: -3, max: 3, step: 0.05, label: "1. Laptop Move Y" },
    modelPosZ: { value: 0, min: -3, max: 3, step: 0.05, label: "1. Laptop Move Z" },
    modelScale: { value: 1.25, min: 0.25, max: 3, step: 0.05, label: "1. Laptop Scale" },
    screenPosX: { value: 0, min: -3, max: 3, step: 0.01, label: "2. Screen Move X" },
    screenPosY: { value: 1.56, min: -3, max: 4, step: 0.01, label: "2. Screen Move Y" },
    screenPosZ: { value: -1.4, min: -3, max: 3, step: 0.01, label: "2. Screen Move Z" },
    screenRotX: { value: -0.256, min: -Math.PI, max: Math.PI, step: 0.01, label: "3. Screen Pitch (X)" },
    screenRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "3. Screen Yaw (Y)" },
    screenRotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01, label: "3. Screen Roll (Z)" },
    screenDistance: { value: 1.17, min: 0.25, max: 3, step: 0.01, label: "4. Screen Zoom" },
    previewLength: { value: 1, min: 0.25, max: 3, step: 0.01, label: "4. Preview Length (Width)" },
    previewBreadth: { value: 1, min: 0.25, max: 3, step: 0.01, label: "4. Preview Breadth (Height)" },
    iframeWidth: { value: 1024, min: 400, max: 2200, step: 10, label: "5. Iframe Pixel Width" },
    iframeHeight: { value: 670, min: 300, max: 1600, step: 10, label: "5. Iframe Pixel Height" },
    scaleX: { value: 1, min: 0.2, max: 3, step: 0.01, label: "5. Stretch Width X" },
    scaleY: { value: 1, min: 0.2, max: 3, step: 0.01, label: "5. Stretch Height Y" },
    cssRotateX: { value: 0, min: -60, max: 60, step: 0.5, label: "6. Trapezium Fix (CSS RotX)" },
    skewX: { value: 0, min: -45, max: 45, step: 0.5, label: "6. Skew X (deg)" },
    skewY: { value: 0, min: -45, max: 45, step: 0.5, label: "6. Skew Y (deg)" },
    cssPerspective: { value: 1000, min: 100, max: 5000, step: 50, label: "6. CSS Perspective (px)" },
    enableGizmo: { value: true, label: "7. Enable Mouse Drag Gizmo" },
    gizmoMode: { options: ["translate", "rotate", "scale"], value: "translate", label: "7. Gizmo Tool Mode" },
    "7. Print Coordinates": button(() => {
      console.log("=== LOCKED MACBOOK & SCREEN COORDINATES ===");
      console.log("Copy these numbers to lock them in:");
      console.log({ screenPosX, screenPosY, screenPosZ, screenRotX, screenRotY, screenRotZ, previewLength, previewBreadth });
      alert(`Coordinates logged to F12 Console!\nPos: [${screenPosX}, ${screenPosY}, ${screenPosZ}]\nRot: [${screenRotX}, ${screenRotY}, ${screenRotZ}]`);
    }),
  });

  const iframeStyle: React.CSSProperties = {
    width: `${iframeWidth}px`,
    height: `${iframeHeight}px`,
    transform: `perspective(${cssPerspective}px) rotateX(${cssRotateX}deg) skew(${skewX}deg, ${skewY}deg) scale(${scaleX}, ${scaleY})`,
    transformOrigin: "center center",
    border: "none",
    borderRadius: "20px",
    background: "#000000",
  };

  const screenGroupContent = (
    <group
      position={[screenPosX, screenPosY, screenPosZ]}
      rotation={[screenRotX, screenRotY, screenRotZ]}
      scale={[previewLength, previewBreadth, 1]}
    >
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={screenDistance}
      >
        {iframe ? <iframe src={iframe} style={iframeStyle} /> :
          <iframe
            allow="fullscreen"
            src="https://giphy.com/embed/2KZ2v2vifTGTvGg1fu/video"
            style={iframeStyle} />
        }
      </Html>
    </group>
  );

  return (
    <>
      <group position={[modelPosX, -0.2, modelPosZ]} rotation={[modelRotX, modelRotY, modelRotZ]}>
        <Float rotationIntensity={0.2}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color="#ffc500"
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]} />
          <primitive object={computer.scene} position-y={modelPosY} scale={modelScale}>
            {enableGizmo ? (
              <TransformControls mode={gizmoMode}>
                {screenGroupContent}
              </TransformControls>
            ) : (
              screenGroupContent
            )}
          </primitive>
        </Float>
      </group>
      <ContactShadows position-y={-1} opacity={0.4} scale={5} blur={2.4} />
    </>
  )
}

export default Computer

useGLTF.preload("/models/macbook.glb")