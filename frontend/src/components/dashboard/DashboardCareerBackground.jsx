import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * DashboardCareerBackground
 * Modern executive career command background for the JobTrack dashboard.
 * Replaces the dated CRT oscilloscope/phosphor dust tube with a sleek,
 * responsive 3D career pipeline grid with ambient lighting and clean perspective.
 */
const DashboardCareerBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) return;
    } catch (e) {
      return;
    }

    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d14, 0.018);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 42);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. High-Tech Career Perspective Grid
    const gridHelper = new THREE.GridHelper(140, 36, 0xf59e0b, 0x1e2438);
    gridHelper.position.y = -8;
    gridHelper.material.opacity = 0.28;
    gridHelper.material.transparent = true;
    rootGroup.add(gridHelper);

    // 3. Ambient Career Pipeline Longitudinal Rails
    const railCount = 5;
    const railSpacing = 16;
    const railMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.25
    });

    for (let r = 0; r < railCount; r++) {
      const rx = (r - (railCount - 1) / 2) * railSpacing;
      const pts = [
        new THREE.Vector3(rx, -8, -60),
        new THREE.Vector3(rx, -8, 40)
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, railMat);
      rootGroup.add(line);
    }

    // 4. Glowing Intersect Coordinate Nodes
    const nodeCoords = [
      [-24, -8, -10],
      [-8, -8, 5],
      [8, -8, -15],
      [24, -8, 0],
      [-16, -8, 20],
      [16, -8, 15]
    ];

    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.6
    });
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });

    const nodeGeo = new THREE.BoxGeometry(0.8, 0.4, 0.8);
    const ringGeo = new THREE.RingGeometry(1.6, 1.9, 24);

    nodeCoords.forEach(([nx, ny, nz]) => {
      const nMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nMesh.position.set(nx, ny, nz);

      const rMesh = new THREE.Mesh(ringGeo, ringMat);
      rMesh.rotation.x = Math.PI / 2;
      rMesh.position.set(nx, ny + 0.1, nz);

      rootGroup.add(nMesh);
      rootGroup.add(rMesh);
    });

    // 5. Subtle Data Packets moving along the rails
    const packetCount = 8;
    const packets = [];
    const packetGeo = new THREE.BoxGeometry(0.6, 0.3, 1.6);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.75
    });

    for (let p = 0; p < packetCount; p++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      const railIdx = p % railCount;
      const rx = (railIdx - (railCount - 1) / 2) * railSpacing;
      mesh.position.set(rx, -7.8, -50 + Math.random() * 80);
      rootGroup.add(mesh);
      packets.push({
        mesh,
        speed: 0.2 + Math.random() * 0.15,
        minZ: -60,
        maxZ: 35
      });
    }

    // 6. Interactive Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Damped mouse movement
      currentMouseX += (targetMouseX - currentMouseX) * 0.035;
      currentMouseY += (targetMouseY - currentMouseY) * 0.035;

      camera.position.x = currentMouseX * 10;
      camera.position.y = 16 - currentMouseY * 5;
      camera.lookAt(0, 2, 0);

      // Move data packets along pipeline rails
      packets.forEach((pkt) => {
        pkt.mesh.position.z += pkt.speed;
        if (pkt.mesh.position.z > pkt.maxZ) {
          pkt.mesh.position.z = pkt.minZ;
        }
      });

      // Subtle grid drift
      gridHelper.position.z = (elapsedTime * 1.5) % (140 / 36);

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      gridHelper.geometry.dispose();
      nodeGeo.dispose();
      ringGeo.dispose();
      packetGeo.dispose();
      renderer.dispose();

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="dashboard-career-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
};

export default DashboardCareerBackground;
