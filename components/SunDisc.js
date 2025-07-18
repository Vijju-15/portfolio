'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SunDisc() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(300, 300);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Glowing base disc
    const discTexture = new THREE.TextureLoader().load('/disc-glow.png'); // Place your PNG in /public
    const discMat = new THREE.MeshBasicMaterial({
      map: discTexture,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const discGeo = new THREE.CircleGeometry(2.5, 64);
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -1.2;
    scene.add(disc);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xffdd88, 1, 10);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);

    // Animate
    const animate = () => {
      disc.rotation.z += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <canvas
      id="threeCanvas"
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: '300px',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
